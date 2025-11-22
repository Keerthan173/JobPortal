import connectDB from "@/lib/db";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

// ---------------------- GET PROFILE --------------------------
export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const decoded = jwt.verify(token, "secret123");
    const userId = decoded.id;

    // Fetch main user info
    const [userRows] = await connectDB.query(
      "SELECT id, email, role, created_at FROM users WHERE id = ?",
      [userId]
    );

    if (userRows.length === 0)
      return NextResponse.json({ message: "User not found" }, { status: 404 });

    const user = userRows[0];

    // Fetch profile based on role
    let profileData = {};

    if (user.role === "candidate") {
      const [rows] = await connectDB.query(
        "SELECT name, education, skills, experience, resume_url, linkedin, portfolio FROM candidates WHERE user_id = ?",
        [userId]
      );
      profileData = rows[0] || {};
    }

    if (user.role === "company") {
      const [rows] = await connectDB.query(
        "SELECT company_name, description, industry, location, website, contact_email, logo_url FROM companies WHERE user_id = ?",
        [userId]
      );
      profileData = rows[0] || {};
    }

    return NextResponse.json({
      ...user,
      profile: profileData,
    });
  } catch (error) {
    console.error("Profile GET error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// ---------------------- UPDATE PROFILE ------------------------
export async function PUT(req) {
  try {
    const body = await req.json();
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const decoded = jwt.verify(token, "secret123"); // FIXED
    const userId = decoded.id;

    const [roleRows] = await connectDB.query(
      "SELECT role FROM users WHERE id = ?",
      [userId]
    );

    if (roleRows.length === 0)
      return NextResponse.json({ message: "User not found" }, { status: 404 });

    const role = roleRows[0].role;

    if (role === "candidate") {
      await connectDB.query(
        `UPDATE candidates SET
          name=?, education=?, skills=?, experience=?,
          resume_url=?, linkedin=?, portfolio=?
         WHERE user_id=?`,
        [
          body.name,
          body.education,
          body.skills,
          body.experience,
          body.resume_url,
          body.linkedin,
          body.portfolio,
          userId,
        ]
      );
    }

    if (role === "company") {
      await connectDB.query(
        `UPDATE companies SET
          company_name=?, description=?, industry=?,
          location=?, website=?, contact_email=?, logo_url=?
         WHERE user_id=?`,
        [
          body.company_name,
          body.description,
          body.industry,
          body.location,
          body.website,
          body.contact_email,
          body.logo_url,
          userId,
        ]
      );
    }

    return NextResponse.json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("Profile PUT error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
