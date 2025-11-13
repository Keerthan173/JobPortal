import connectDB from "@/lib/db";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

// Get user profile
export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const decoded = jwt.verify(token, "secret123");
    const userId = decoded.id;
    const [rows] = await connectDB.query(
      "SELECT id,name,email,role,created_at FROM users WHERE id=?",
      [userId]
    );

    if (rows.length === 0) {
      return NextResponse.json({ message: "User Not found" }, { status: 404 });
    }
    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error("profile fetch error:", error);
    return NextResponse.json(
      { message: "DataBase or token error" },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const decoded = jwt.verify(token, "secret123");
    const userId = decoded.id;
    const { name, email } = await req.json();
    const [result] = await connectDB.query(
      "UPDATE users SET name=? ,email=? where id=?",
      [name, email, userId]
    );
    if (result.affectedRows === 0) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json(
      { message: "Database or token error" },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const decoded = jwt.verify(token, "secret123");
    const userId = decoded.id;
    const [result] = await connectDB.query("DELETE FROM users WHERE id=?", [
      userId,
    ]);
    if (result.affectedRows === 0) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const response = NextResponse.json({
      message: "Account deleted successFully",
    });
    response.cookies.set("token", "", { maxAge: 0 });
    return response;
  } catch (error) {
    console.error("Account delete error:", err);
    return NextResponse.json(
      { message: "Database or token error" },
      { status: 500 }
    );
  }
}
