// app/api/candidate/dashboard/route.js
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/db";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret123");
    const userId = decoded.id;

    // Validate role is candidate (optional)

    const [userRows] = await connectDB.query(
      "SELECT role FROM users WHERE id = ?",
      [userId]
    );
    if (!userRows[0] || userRows[0].role !== "candidate") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    console.log("UserId", userId);

    const [candidate_id_rows] = await connectDB.query(
      "select id from candidates where user_id=?",
      [userId]
    );
    if (!candidate_id_rows[0]) {
      return Response.json(
        {
          message: "Candidate id not present",
        },
        {
          status: 500,
        }
      );
    }
    const candidate_id = candidate_id_rows[0].id;
    // Call the stored procedure
    console.log("candidate id:",candidate_id);
    const [results] = await connectDB.query("CALL candidate_dashboard(?)", [
      candidate_id,
    ]);
    console.log("Results:", results);
    // mysql2 returns array-of-arrays. For multiple resultsets you may get results as:
    // results[0] => first resultset rows, results[1] => second resultset rows, ...
    // but depending on pool settings, you might also get nested structure; below handles typical shape.

    // Most common: `results` is an array where each element is an array of rows for that resultset.
    // We'll try to normalize defensively:sahana@gmail.com
    const totalApplications = results[0][0] || { total_applications: 0 };
    const statusSummary = results[1][0] || {
      pending: 0,
      reviewed: 0,
      accepted: 0,
      rejected: 0,
    };
    console.log(results[1][0]);
    const recentApplications = results[2] || [];
    const profile = results[3][0] || {};

    return NextResponse.json({
      overview: totalApplications,
      statusSummary,
      recentApplications,
      profile,
    });
  } catch (err) {
    console.error("candidate dashboard error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
