import connectDB  from "@/lib/db";
import { NextResponse } from "next/server";

// Get user profile
export async function GET(req, { params }) {
  try {
    const [rows] = await connectDB.query("SELECT id, name, email, role FROM users WHERE id = ?", [params.id]);
    if (rows.length === 0) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json(rows[0]);
  } catch (err) {
    return NextResponse.json({ message: "Database error" }, { status: 500 });
  }
}

// Update user profile
export async function PUT(req, { params }) {
  try {
    const { name, email } = await req.json();
    const [result] = await connectDB.query("UPDATE users SET name=?, email=? WHERE id=?", [name, email, params.id]);

    if (result.affectedRows === 0) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Profile updated successfully" });
  } catch (err) {
    return NextResponse.json({ message: "Database error" }, { status: 500 });
  }
}

// Delete user
export async function DELETE(req, { params }) {
  try {
    const [result] = await connectDB.query("DELETE FROM users WHERE id=?", [params.id]);
    if (result.affectedRows === 0) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Account deleted successfully" });
  } catch (err) {
    return NextResponse.json({ message: "Database error" }, { status: 500 });
  }
}
