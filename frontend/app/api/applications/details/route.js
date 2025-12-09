import connectDB from "@/lib/db";
import { NextResponse } from "next/server";

// GET candidate application details
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const jobId = searchParams.get("job_id");
    const candidateId = searchParams.get("candidate_id");

    if (!jobId || !candidateId) {
      return NextResponse.json(
        { message: "job_id and candidate_id are required" },
        { status: 400 }
      );
    }

    const [rows] = await connectDB.query(
      `
      SELECT
        c.name,
        c.education,
        c.skills,
        c.experience,
        c.linkedin,
        c.portfolio,
        a.resume_url,
        a.cover_letter
      FROM applications a
      INNER JOIN candidates c
        ON c.id = a.candidate_id
      WHERE a.job_id = ?
        AND a.candidate_id = ?
      `,
      [jobId, candidateId]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { message: "Application not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error("Fetch application details error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
