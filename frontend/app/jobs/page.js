import connectDB from "@/lib/db";

export default async function JobsPage() {
  const [jobs] = await connectDB.query(
    "SELECT * FROM jobs ORDER BY created_at DESC"
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Available Jobs</h1>

      <div className="space-y-4">
        {jobs.map((job) => (
          <a
            key={job.id}
            href={`/jobs/${job.id}`}
            className="border p-4 rounded hover:bg-gray-100 block"
          >
            <h2 className="text-xl font-bold">{job.title}</h2>
            <p className="text-gray-700">{job.location}</p>
            <p className="font-semibold mt-1">Salary: {job.salary}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
