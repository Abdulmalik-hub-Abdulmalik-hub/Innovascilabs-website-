import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  // Wannan yana duba ko user yana da session (login)
  const {
    data: { session },
  } = await supabase.auth.getSession()

  const url = new URL(req.url)

  // 1. Kare Admin Routes (/admin)
  if (url.pathname.startsWith('/admin')) {
    // Idan ba a yi login ba, tura shi login page
    if (!session) {
      return NextResponse.redirect(new URL('/login', req.url))
    }

    // Idan email dinsa ba na Admin bane (abdulmalikmusba@gmail.com), tura shi dashboard na talaka
    if (session.user.email !== process.env.ADMIN_EMAIL) {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }
  }

  // 2. Kare User Dashboard (/dashboard)
  if (url.pathname.startsWith('/dashboard') && !session) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return res
}

// Wadanne wurare ne middleware zai rinka gadi?
export const config = {
  matcher: [
    '/admin/:path*',
    '/dashboard/:path*',
    '/profile/:path*',
  ],
}
