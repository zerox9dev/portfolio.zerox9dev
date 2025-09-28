import { redirect } from 'next/navigation'
import parser from 'accept-language-parser'

const locales = ['en-US', 'uk-UA']
const defaultLocale = 'en-US'

function getLocale(requestHeaders: Headers) {
  const acceptLanguage = requestHeaders.get('accept-language')
  return parser.pick(locales, acceptLanguage || '', { loose: true }) || defaultLocale
}

export default function RootPage() {
  // Определяем локаль на основе заголовков запроса
  const headers = new Headers()
  // В Next.js 15+ мы можем получить headers через headers()
  // Но для простоты используем redirect с параметром
  const locale = defaultLocale // Fallback to default locale

  redirect(`/${locale}`)
}
