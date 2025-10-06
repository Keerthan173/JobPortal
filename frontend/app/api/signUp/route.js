import  connectDB  from "@/lib/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

const signUpHandler = async (req) => {
  try {
    const { name, email, password, role } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await connectDB.query(
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
      [name, email, hashedPassword, role || "candidate"]
    );
    return NextResponse.json(
      { message: "User registered successfully!" },
      { status: 201 }
    );
  } catch(err) {
        console.error("Signup error:", err);
    return NextResponse.json({ message: "Database error: " + err.message }, { status: 500 })
  }
};

export{signUpHandler as POST};
