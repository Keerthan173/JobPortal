"use client";
import { useState, useEffect } from "react";

export default function CandidateApplications() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const loadApps = async () => {
      const res = await fetch("/api/applications");
      const data = await res.json();
      console.log("API data:", data);

      // FIX: Extract the array
      setApplications(data.applications || []);
    };
    loadApps();
  }, []);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Applications</h1>

      {applications.length === 0 && <p>No applications yet.</p>}

      <div className="space-y-4">
        {applications.map((app) => (
          <div key={app.application_id} className="border shadow p-4 rounded-lg">
            <h2 className="text-xl font-semibold">{app.title}</h2>
            <p className="text-gray-700">{app.location}</p>

            <p className="mt-2">
              <strong>Status:</strong>{" "}
              <span
                className={
                  app.status === "accepted"
                    ? "text-green-600"
                    : app.status === "rejected"
                    ? "text-red-600"
                    : "text-yellow-600"
                }
              >
                {app.status}
              </span>
            </p>

            <p className="text-sm text-gray-600 mt-2">
              Applied on {new Date(app.applied_at).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
