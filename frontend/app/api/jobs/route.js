import connectDB from "@/lib/db";
import { NextResponse } from "next/server";

// Post a new job
export async function POST(req) {
  try {
    const { title, description, company, location } = await req.json();

    const [result] = await connectDB.query(
      "INSERT INTO jobs (title, description, company, location) VALUES (?, ?, ?, ?)",
      [title, description, company, location]
    );

    return NextResponse.json({ message: "Job posted successfully", jobId: result.insertId }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: "Database error" }, { status: 500 });
  }
}

// Get all jobs
export async function GET() {
  try {
    const [jobs] = await connectDB.query("SELECT * FROM jobs ORDER BY created_at DESC");
    return NextResponse.json(jobs);
  } catch (err) {
    return NextResponse.json({ message: "Database error" }, { status: 500 });
  }
}
