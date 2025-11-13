import connectDB from "@/lib/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const {
      name,
      email,
      password,
      confirmPassword,
      role,
      companyName,
      companyWebsite,
    } = await req.json();

    // ✅ Basic validation
    console.log("Role:", role);
    if (
      (role === "candidate" &&
        (!name || !email || !password || !confirmPassword || !role)) ||
      (role === "company" &&
        (!companyName || !email || !password || !confirmPassword || !role))
    ) {
      return NextResponse.json(
        { message: "All required fields must be filled." },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { message: "Passwords do not match." },
        { status: 400 }
      );
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Insert into users
    const [existingUser] = await connectDB.query(
      "SELECT * from users where email=?",
      [email]
    );

    if (existingUser.length > 0) {
      return NextResponse.json(
        { message: "Email already registered. Please login instead." },
        { status: 400 }
      );
    }
    const [userResult] = await connectDB.query(
      "INSERT INTO users (email, password, role) VALUES (?, ?, ?)",
      [email, hashedPassword, role]
    );

    const userId = userResult.insertId;

    // ✅ Insert into companies if HR
    if (role === "company") {
      await connectDB.query(
        "INSERT INTO companies (user_id, company_name,website) VALUES (?, ?, ?)",
        [userId, companyName || null, companyWebsite || null]
      );
    }

    // ✅ Insert into candidates if candidate
    if (role === "candidate") {
      await connectDB.query(
        "INSERT INTO candidates (user_id, name) VALUES (?, ?)",
        [userId, name]
      );
    }

    return NextResponse.json(
      { message: "✅ User registered successfully!", userId, role },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { message: "Database error: " + error.message },
      { status: 500 }
    );
  }
}
