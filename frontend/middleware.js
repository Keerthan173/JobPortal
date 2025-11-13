import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
export function middleware(req){
    const token =req.cookies.get()
}