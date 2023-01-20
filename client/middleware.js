import { NextResponse } from "next/server";
import { protectedRoutes } from "./consts/routes";

export function middleware(request) {
  const currentUser = request.cookies.get("currentUser")?.value;
  const isProtected = protectedRoutes.some((item) => request.nextUrl.pathname.startsWith(item));
  if (
     isProtected &&
    (!currentUser || Date.now() > JSON.parse(currentUser).expiredAt)
  ) {
    request.cookies.delete("currentUser");
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("currentUser");

    return response;
  }

  if (request.nextUrl.pathname.startsWith("/login") && currentUser) {
    return NextResponse.redirect(new URL("/blogs", request.url));
  }
}

