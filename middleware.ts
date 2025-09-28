import { NextRequest, NextResponse } from 'next/server'
import parser from 'accept-language-parser'

const locales = ['en-US', 'uk-UA']
const defaultLocale = 'en-US'

function getLocale(request: NextRequest) {
  const acceptLanguage = request.headers.get('accept-language')
  return parser.pick(locales, acceptLanguage || '', { loose: true }) || defaultLocale
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  console.log(`[1] Middleware: Received request for "${pathname}"`);

  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  )

  if (pathnameIsMissingLocale) {
    const locale = getLocale(request)
    const newUrl = new URL(`/${locale}${pathname}`, request.url)
    console.log(`[2] Middleware: Rewriting to "${newUrl.href}"`);
    return NextResponse.rewrite(newUrl)
  }
}

export const config = {
  matcher: [
    // Skip all internal paths (_next) and paths with file extensions
    '/((?!_next|.*\\..*).*)',
  ],
}

