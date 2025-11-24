"use client";

import { useEffect, useState } from "react";
import {
  Briefcase,
  MapPin,
  Trash2,
  Pencil,
  IndianRupee,
  CalendarDays,
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
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Manage Jobs</h2>

      {jobs.length === 0 ? (
        <p>No jobs posted yet.</p>
      ) : (
        <div className="space-y-5">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="border rounded-xl p-5 shadow bg-white hover:shadow-md transition"
            >
              {/* TITLE */}
              <h3 className="text-xl font-semibold flex items-center gap-2 mb-3">
                <Briefcase size={20} className="text-blue-600" />
                {job.title}
              </h3>

              {/* DETAILS */}
              <div className="grid md:grid-cols-2 gap-3 text-sm">
                {/* Location */}
                <div className="flex items-center gap-2">
                  <MapPin size={18} className="text-gray-600" />
                  <span className="font-semibold">Location:</span>{" "}
                  {job.location}
                </div>

                {/* Salary */}
                <div className="flex items-center gap-2">
                  <IndianRupee size={18} className="text-gray-600" />
                  <span className="font-semibold">Salary:</span>{" "}
                  {job.salary || "Not specified"}
                </div>

                {/* Job Type */}
                <div className="flex items-center gap-2">
                  <Briefcase size={18} className="text-gray-600" />
                  <span className="font-semibold">Type:</span>{" "}
                  {job.job_type || "N/A"}
                </div>

                {/* Posted On */}
                <div className="flex items-center gap-2">
                  <CalendarDays size={18} className="text-gray-600" />
                  <span className="font-semibold">Posted:</span>{" "}
                  {new Date(job.created_at).toLocaleDateString()}
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="mt-5 flex justify-end gap-3">
                <a
                  href={`/dashboard/company/edit-job/${job.id}`}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
                >
                  <Pencil size={18} />
                  Edit
                </a>

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
