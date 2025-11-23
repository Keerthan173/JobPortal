import connectDB from "@/lib/db";
import { cookies } from "next/headers";

export default async function JobDetails({ params }) {
  const { id: jobId } = await params;

  const [jobRows] = await connectDB.query("SELECT * FROM jobs WHERE id = ?", [
    jobId,
  ]);

  const job = jobRows[0];

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold">{job.title}</h1>
      <p className="mt-2">{job.description}</p>
      <p className="mt-2 font-semibold">Location: {job.location}</p>
      <p className="mt-2 font-semibold">Salary: {job.salary}</p>

      <a
        href={`/jobs/${jobId}/apply`}
        className="mt-6 inline-block bg-blue-600 text-white px-4 py-2 rounded"
      >
        Apply Now
      </a>
    </div>
  );
}
