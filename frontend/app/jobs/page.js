// app/jobs/page.js
import connectDB from "@/lib/db";
import JobsClient from "@/components/JobClient";

export default async function JobsPage() {
  const [jobs] = await connectDB.query(
    "SELECT * FROM jobs ORDER BY created_at DESC"
  );

  return <JobsClient jobs={jobs} />;
}
