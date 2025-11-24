import connectDB from "@/lib/db";
import {
  Briefcase,
  MapPin,
  IndianRupee,
  ClipboardList,
  Clock,
} from "lucide-react";

export default async function JobDetails({ params }) {
  const { id: jobId } = await params;

  const [jobRows] = await connectDB.query("SELECT * FROM jobs WHERE id = ?", [
    jobId,
  ]);

  const job = jobRows[0];

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Card */}
      <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-200">
        {/* Title */}
        <h1 className="text-4xl font-bold mb-4">{job.title}</h1>

        {/* Meta Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="flex items-center gap-2 text-gray-700">
            <Briefcase size={20} />
            <span className="font-medium">Job Type:</span>
            <span>{job.job_type || "Not specified"}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-700">
            <MapPin size={20} />
            <span className="font-medium">Location:</span>
            <span>{job.location}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-700">
            <IndianRupee size={20} />
            <span className="font-medium">Salary:</span>
            <span>{job.salary}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-700">
            <Clock size={20} />
            <span className="font-medium">Posted on:</span>
            <span>{new Date(job.created_at).toDateString()}</span>
          </div>
        </div>

        {/* Description */}
        <div className="mt-6">
          <h2 className="text-2xl font-semibold flex items-center gap-2 mb-2">
            <ClipboardList size={22} /> Job Description
          </h2>
          <p className="text-gray-700 leading-relaxed">{job.description}</p>
        </div>

        {/* Requirements */}
        {job.requirements && (
          <div className="mt-6">
            <h2 className="text-2xl font-semibold mb-2 flex items-center gap-2">
              <ClipboardList size={22} /> Requirements
            </h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {job.requirements}
            </p>
          </div>
        )}

        {/* Apply Button */}
        <a
          href={`/jobs/${jobId}/apply`}
          className="mt-8 inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow transition"
        >
          Apply Now
        </a>
      </div>
    </div>
  );
}
