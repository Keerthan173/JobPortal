"use client";

import { useEffect, useState,use } from "react";
import {
  Briefcase,
  MapPin,
  Trash2,
  Pencil,
  IndianRupee,
  CalendarDays,
  Users,
} from "lucide-react";

export default function ManageJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchJobs() {
      try {
        const res = await fetch("/api/jobs", {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();
        console.log("data from manage-jobs", data);
        console.log("jobs data",data);
        setJobs(data);
      } catch (err) {
        console.error("Error fetching jobs:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchJobs();
  }, []);

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Manage Jobs</h2>

      {jobs.length === 0 ? (
        <p>No jobs posted yet.</p>
      ) : (
        <div className="space-y-5">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="border rounded-xl p-6 shadow bg-white hover:shadow-lg transition-all duration-200"
            >
              {/* Job Title */}
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Briefcase size={22} className="text-blue-600" />
                  {job.title}
                </h3>
              </div>

              {/* Job Details */}
              <div className="grid md:grid-cols-2 gap-4 text-sm mb-5">
                <div className="flex items-center gap-2">
                  <MapPin size={18} className="text-gray-600" />
                  <span className="font-semibold">Location:</span>{" "}
                  {job.location}
                </div>

                <div className="flex items-center gap-2">
                  <IndianRupee size={18} className="text-gray-600" />
                  <span className="font-semibold">Salary:</span>{" "}
                  {job.salary || "Not specified"}
                </div>

                <div className="flex items-center gap-2">
                  <Briefcase size={18} className="text-gray-600" />
                  <span className="font-semibold">Type:</span>{" "}
                  {job.job_type || "N/A"}
                </div>

                <div className="flex items-center gap-2">
                  <CalendarDays size={18} className="text-gray-600" />
                  <span className="font-semibold">Posted:</span>{" "}
                  {new Date(job.created_at).toLocaleDateString()}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap justify-end gap-3 pt-3 border-t">
                {/* View Applicants */}
                <a
                  href={`/dashboard/company/manage-jobs/${job.id}`}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition"
                >
                  <Users size={18} />
                  View Applicants
                </a>

                {/* Edit */}
                <a
                  href={`/dashboard/company/edit-job/${job.id}`}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
                >
                  <Pencil size={18} />
                  Edit
                </a>

                {/* Delete */}
                <button
                  onClick={async () => {
                    await fetch("/api/jobs", {
                      method: "DELETE",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ id: job.id }),
                    });
                    setJobs(jobs.filter((j) => j.id !== job.id));
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition"
                >
                  <Trash2 size={18} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
