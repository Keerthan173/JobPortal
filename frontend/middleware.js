import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
export function middleware(req) {
  const token = req.cookies.get("token")?.value;
  const protectedRoutes = ["profile", "hr-dashboard", "candidate-dashboard"];
  if (protectedRoutes.some((path) => req.nextUrl.pathname.startsWith(path))) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    console.log("token",token)
    try {
      jwt.verify(token, process.env.JWT_SECRET || "secret123");
    } catch (error) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }
}
