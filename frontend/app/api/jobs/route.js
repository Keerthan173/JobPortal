import connectDB from "@/lib/db";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const body = await req.json();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const decoded = jwt.verify(token, "secret123");
    const userId = decoded.id;

    const [company] = await connectDB.query(
      "SELECT id FROM companies WHERE user_id = ?",
      [userId]
    );

    if (company.length === 0)
      return NextResponse.json(
        { message: "Only companies can post jobs" },
        { status: 403 }
      );

    const company_id = company[0].id;
    // console.log("body:", body);
    await connectDB.query(
      `INSERT INTO jobs (company_id, title, description,requirements, location, salary, job_type)
       VALUES (?, ?, ?, ?, ?, ?,?)`,
      [
        company_id,
        body.title,
        body.description,
        body.requirement,
        body.location,
        body.salary,
        body.job_type,
      ]
    );

    return NextResponse.json({ message: "Job posted successfully" });
  } catch (err) {
    console.error("POST job error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const decoded = jwt.verify(token, "secret123");
    const userId = decoded.id;

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id"); // 👈 SINGLE JOB

    // 1️⃣ If single job requested
    if (id) {
      const [job] = await connectDB.query(`SELECT * FROM jobs WHERE id = ?`, [
        id,
      ]);

      if (job.length === 0)
        return NextResponse.json({ message: "Job not found" }, { status: 404 });

      return NextResponse.json({ job: job[0] });
    }

    // 2️⃣ Otherwise return job lists based on role
    const [userRows] = await connectDB.query(
      "SELECT role FROM users WHERE id = ?",
      [userId]
    );
    const role = userRows[0].role;

    if (role === "candidate") {
      const [jobs] = await connectDB.query(
        `SELECT jobs.*, companies.company_name 
         FROM jobs 
         JOIN companies ON companies.id = jobs.company_id
         ORDER BY jobs.created_at DESC`
      );

      return NextResponse.json(jobs);
    }

    if (role === "company") {
      const [company] = await connectDB.query(
        "SELECT id FROM companies WHERE user_id = ?",
        [userId]
      );
      const companyId = company[0].id;

      const [jobs] = await connectDB.query(
        "SELECT * FROM jobs WHERE company_id = ? ORDER BY created_at DESC",
        [companyId]
      );

      return NextResponse.json(jobs);
    }
  } catch (err) {
    console.error("GET jobs error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const body = await req.json();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const decoded = jwt.verify(token, "secret123");
    const userId = decoded.id;

    const [company] = await connectDB.query(
      "SELECT id FROM companies WHERE user_id = ?",
      [userId]
    );
    const companyId = company[0].id;

    await connectDB.query(
      `UPDATE jobs SET 
        title=?, description=?, location=?, salary=?, job_type=?
       WHERE id=? AND company_id=?`,
      [
        body.title,
        body.description,
        body.location,
        body.salary,
        body.job_type,
        body.id,
        companyId,
      ]
    );

    return NextResponse.json({ message: "Job updated successfully" });
  } catch (err) {
    console.error("PUT job error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { id } = await req.json();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const decoded = jwt.verify(token, "secret123");
    const userId = decoded.id;

    const [company] = await connectDB.query(
      "SELECT id FROM companies WHERE user_id = ?",
      [userId]
    );
    const companyId = company[0].id;

    await connectDB.query("DELETE FROM jobs WHERE id=? AND company_id=?", [
      id,
      companyId,
    ]);

    return NextResponse.json({ message: "Job deleted successfully" });
  } catch (err) {
    console.error("DELETE job error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
