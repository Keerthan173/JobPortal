import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/db";

export async function PATCH(req) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Decode cookie token
    const decoded = jwt.verify(token, "secret123");
    const userId = decoded.id;

    // Check user role
    const [user] = await connectDB.query(
      "SELECT role FROM users WHERE id = ?",
      [userId]
    );

    if (user.length === 0 || user[0].role !== "company") {
      return NextResponse.json(
        { message: "Only company can update status" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { applicationId, status } = body;

    if (!applicationId || !status) {
      return NextResponse.json(
        { message: "applicationId and status required" },
        { status: 400 }
      );
    }

    // Find company id
    const [company] = await connectDB.query(
      "SELECT id FROM companies WHERE user_id = ?",
      [userId]
    );
    console.log("company",company)

    if (company.length === 0) {
      return NextResponse.json(
        { message: "Company profile not found" },
        { status: 404 }
      );
    }

    const companyId = company[0].id;

    // Ensure application belongs to a job owned by this company
    const [check] = await connectDB.query(
      `SELECT applications.id
       FROM applications
       JOIN jobs ON jobs.id = applications.job_id
       WHERE applications.id = ? 
       AND jobs.company_id = ?`,
      [applicationId, companyId]
    );

    if (check.length === 0) {
      return NextResponse.json(
        { message: "Not authorized to update this application" },
        { status: 403 }
      );
    }

    // Update application status
    await connectDB.query("UPDATE applications SET status = ? WHERE id = ?", [
      status,
      applicationId,
    ]);

    return NextResponse.json({
      message: "Application status updated successfully",
    });
  } catch (err) {
    console.error("Status update error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
