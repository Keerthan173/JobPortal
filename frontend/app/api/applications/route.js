import connectDB from "@/lib/db";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

// -------------------- POST (Apply Job) --------------------
export async function POST(req) {
  try {
    const { job_id, resume_url, cover_letter } = await req.json();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, "secret123");
    const userId = decoded.id;

    // ensure user is a candidate
    const [candidate] = await connectDB.query(
      "SELECT id FROM candidates WHERE user_id = ?",
      [userId]
    );

    if (candidate.length === 0) {
      return NextResponse.json(
        { message: "Only candidates can apply" },
        { status: 403 }
      );
    }

    const candidate_id = candidate[0].id;

    // Check if job exists
    const [job] = await connectDB.query("SELECT id FROM jobs WHERE id = ?", [
      job_id,
    ]);
    if (job.length === 0) {
      return NextResponse.json({ message: "Job not found" }, { status: 404 });
    }

    // Prevent duplicate applications
    const [existing] = await connectDB.query(
      "SELECT id FROM applications WHERE job_id = ? AND candidate_id = ?",
      [job_id, candidate_id]
    );

    if (existing.length > 0) {
      return NextResponse.json(
        { message: "You have already applied for this job" },
        { status: 409 }
      );
    }

    // Insert application
    await connectDB.query(
      `INSERT INTO applications (job_id, candidate_id, resume_url, cover_letter)
       VALUES (?, ?, ?, ?)`,
      [job_id, candidate_id, resume_url || null, cover_letter || null]
    );

    return NextResponse.json({ message: "Application submitted successfully" });
  } catch (err) {
    console.error("POST application error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// -------------------- GET (List Applications) --------------------
export async function GET(req) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, "secret123");
    const userId = decoded.id;

    // Find role
    const [user] = await connectDB.query(
      "SELECT role FROM users WHERE id = ?",
      [userId]
    );
    const role = user[0].role;

    // ---------- Candidate: List their applications ----------
    if (role === "candidate") {
      const [candidate] = await connectDB.query(
        "SELECT id FROM candidates WHERE user_id = ?",
        [userId]
      );
      const candidate_id = candidate[0].id;

      const [apps] = await connectDB.query(
        `SELECT applications.*, jobs.title, jobs.location, jobs.job_type
         FROM applications
         JOIN jobs ON jobs.id = applications.job_id
         WHERE applications.candidate_id = ?
         ORDER BY applications.applied_at DESC`,
        [candidate_id]
      );

      return NextResponse.json({ applications: apps });
    }

    // ---------- Company: View applicants for a job ----------
    if (role === "company") {
      const { searchParams } = new URL(req.url);
      const jobId = searchParams.get("jobId");

      if (!jobId) {
        return NextResponse.json(
          { message: "jobId required" },
          { status: 400 }
        );
      }

      // Ensure the job belongs to the company
      const [company] = await connectDB.query(
        "SELECT id FROM companies WHERE user_id = ?",
        [userId]
      );
      const company_id = company[0].id;

      const [job] = await connectDB.query(
        "SELECT id FROM jobs WHERE id = ? AND company_id = ?",
        [jobId, company_id]
      );

      if (job.length === 0) {
        return NextResponse.json(
          { message: "You do not own this job posting" },
          { status: 403 }
        );
      }

      const [apps] = await connectDB.query(
        `SELECT applications.*, candidates.name, candidates.email
         FROM applications
         JOIN candidates ON candidates.id = applications.candidate_id
         WHERE applications.job_id = ?
         ORDER BY applications.applied_at DESC`,
        [jobId]
      );

      return NextResponse.json({ applicants: apps });
    }
  } catch (err) {
    console.error("GET applications error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
