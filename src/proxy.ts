import { NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = "simu_admin";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const authed = request.cookies.get(COOKIE_NAME)?.value === "authenticated";
    if (!authed) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
