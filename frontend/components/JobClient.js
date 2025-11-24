"use client";

import { useState } from "react";
import { Search, MapPin, Briefcase, Filter } from "lucide-react";
import { useRouter } from "next/navigation";
export default function JobsClient({ jobs }) {
  const [searchText, setSearchText] = useState("");
const router=useRouter();
  // Filter jobs by search text
  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* PAGE TITLE */}
      <h1 className="text-3xl font-bold mb-6">Available Jobs</h1>

      {/* SEARCH + FILTERS */}
      <div className="bg-white p-4 rounded-xl shadow mb-8 border">
        <div className="flex flex-col md:flex-row gap-4">

          {/* SEARCH BAR */}
          <div className="flex items-center gap-2 border rounded-lg px-3 py-2 flex-1">
            <Search size={20} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search by job title or keywords..."
              className="w-full outline-none"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>

          {/* FILTER BUTTON */}
          <button className="flex items-center gap-2 border px-4 py-2 rounded-lg hover:bg-gray-100 transition">
            <Filter size={18} />
            Filters
          </button>
        </div>
      </div>

      {/* JOB LIST */}
      <div className="space-y-5">
        {filteredJobs.map((job) => (
          <div
            key={job.id}
            onClick={()=>router.push(`/jobs/${job.id}`)}
            className="block border rounded-xl p-6 shadow hover:shadow-md transition bg-white cursor-pointer"
          >
            <h2 className="text-2xl font-semibold mb-2 flex items-center gap-2">
              <Briefcase size={22} className="text-blue-600" />
              {job.title}
            </h2>

            <p className="flex items-center gap-2 text-gray-600 mb-2">
              <MapPin size={18} className="text-gray-500" />
              {job.location}
            </p>

            <p className="text-gray-800 font-medium">
              Salary: <span className="font-semibold">{job.salary}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
