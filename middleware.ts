import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { siteConfig } from "./lib/site-config"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Redirect access to /github
  if (pathname === "/github") {
    return NextResponse.redirect(siteConfig.redirects.github)
  }

  // Redirect access to /video
  if (pathname === "/video") {
    return NextResponse.redirect(siteConfig.redirects.video)
  }

  // Process other paths normally
  return NextResponse.next()
}

// Specify paths to apply middleware
export const config = {
  matcher: ["/github", "/video"],
}
