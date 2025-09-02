import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['el', 'en'] as const
type Locale = typeof locales[number]

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // 1) Κενό root -> πήγαινε στο default locale /el/home
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/el/home', req.url))
  }

  // 2) Αν δεν ξεκινά με /el ή /en, άφησέ το ως έχει (assets, api, κ.λπ.)
  const isLocalePath = locales.some(l => pathname === `/${l}` || pathname.startsWith(`/${l}/`))
  if (!isLocalePath) return NextResponse.next()

  // 3) Προαιρετικά: /el -> /el/home
  const parts = pathname.split('/').filter(Boolean)
  const maybeLocale = parts[0] as Locale
  if (locales.includes(maybeLocale) && parts.length === 1) {
    return NextResponse.redirect(new URL(`/${maybeLocale}/home`, req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next|favicon.ico|robots.txt|sitemap.xml|images|api).*)',
    '/',
  ],
}
