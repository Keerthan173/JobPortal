import connectDB from "@/lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const loginHandler = async (req) => {
  try {
    const { email, password } = await req.json();
    const [users] = await connectDB.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (users.length === 0) {
      return NextResponse.json({ message: "User not found" }, { status: 401 });
    }
    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid password" },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET || "secret123",
      { expiresIn: "1h" }
    );

    // return NextResponse.json({
    //   message: "Login successful!",
    //   token,
    //   user: {
    //     id: user.id,
    //     name: user.name,
    //     email: user.email,
    //     role: user.role,
    //   },
    // });

    const response=NextResponse.json({
      message:"Login successful",
      user:{id:user.id,name:user.name,email:user.email,role:user.role},
    })

    response.cookies.set({
      name:"token",
      value:token,
      httpOnly:true,
      maxAge:3600,
      sameSite:"lax",
      path:"/",
      secure:process.env.NODE_ENV==="production",
    })
    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ message: "Login error" }, { status: 500 });
  }
};

export { loginHandler as POST };
