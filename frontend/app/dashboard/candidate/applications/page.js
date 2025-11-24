"use client";

import { useState, useEffect } from "react";
import { Briefcase, MapPin, Calendar, Clock } from "lucide-react";

export default function CandidateApplications() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const loadApps = async () => {
      const res = await fetch("/api/applications");
      const data = await res.json();
      console.log("API data:", data);

      setApplications(data.applications || []);
    };
    loadApps();
  }, []);

  // Status color badge
  const getStatusColor = (status) => {
    switch (status) {
      case "accepted":
        return "bg-green-100 text-green-700 border-green-300";
      case "rejected":
        return "bg-red-100 text-red-700 border-red-300";
      default:
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Applications</h1>

      {applications.length === 0 && (
        <p className="text-gray-600 text-lg">No applications yet.</p>
      )}

      <div className="space-y-5">
        {applications.map((app) => (
          <div
            key={app.application_id}
            className="border rounded-xl p-6 shadow hover:shadow-md transition bg-white"
          >
            {/* Job Title + Status */}
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Briefcase size={22} className="text-blue-600" />
                  {app.job_title}
                </h2>

                {app.company_name && (
                  <p className="text-gray-600 mt-1">{app.company_name}</p>
                )}
              </div>

              <span
                className={`px-3 py-1 text-sm border rounded-full font-medium ${getStatusColor(
                  app.status
                )}`}
              >
                {app.status}
              </span>
            </div>

            {/* Location + Applied Date */}
            <div className="mt-4 space-y-2 text-gray-700">
              <p className="flex items-center gap-2">
                <MapPin size={18} className="text-gray-500" />
                {app.location}
              </p>

              <p className="flex items-center gap-2">
                <Calendar size={18} className="text-gray-500" />
                Applied on{" "}
                <strong>{new Date(app.applied_at).toLocaleDateString()}</strong>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
