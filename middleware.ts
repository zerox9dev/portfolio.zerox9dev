import { NextRequest, NextResponse } from 'next/server'
import parser from 'accept-language-parser'

const locales = ['en-US', 'uk-UA']
const defaultLocale = 'en-US'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  )

  if (pathnameHasLocale) {
    return
  }

  const acceptLanguage = request.headers.get('Accept-Language')
  const preferredLocale = parser.pick(locales, acceptLanguage || '', { loose: true }) || defaultLocale

  request.nextUrl.pathname = `/${preferredLocale}${pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: [
    // Skip all internal paths (_next) and paths with file extensions
    '/((?!_next|.*\\..*).*)',
  ],
}

