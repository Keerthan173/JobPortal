"use client";

import { useEffect, useState,use } from "react";
import { User, Mail, Calendar, FileText } from "lucide-react";

export default function JobApplicants({ params }) {
  const { id } = use(params); // ← NEW FIX ✅

  const jobId = id;
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchApplicants() {
      try {
        const res = await fetch(`/api/applications?jobId=${jobId}`, {
          credentials: "include",
        });

        const data = await res.json();
        setApplicants(data.applicants || []);
      } catch (error) {
        console.error("Error fetching applicants", error);
      } finally {
        setLoading(false);
      }
    }

    fetchApplicants();
  }, [jobId]);

  async function updateStatus(appId, newStatus) {
    await fetch("/api/applications/status", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        applicationId: appId,
        status: newStatus,
      }),
      credentials: "include",
    });

    // refresh UI
    setApplicants((prev) =>
      prev.map((a) =>
        a.application_id === appId ? { ...a, status: newStatus } : a
      )
    );
  }

  if (loading) return <p className="p-6">Loading applicants...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Applicants for Job #{jobId}</h1>

      {applicants.length === 0 ? (
        <p>No applicants yet.</p>
      ) : (
        <div className="space-y-5">
          {applicants.map((a) => (
            <div
              key={a.application_id}
              className="border shadow p-5 rounded-lg bg-white"
            >
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <User />
                {a.candidate_name}
              </h2>

              <p className="flex items-center gap-2 text-gray-700 mt-2">
                <Mail size={18} /> {a.email}
              </p>

              <p className="flex items-center gap-2 text-gray-700">
                <Calendar size={18} />
                Applied: {new Date(a.applied_at).toLocaleDateString()}
              </p>

              <p className="mt-2">
                <span className="font-semibold">Status:</span> {a.status}
              </p>

              {/* ACTION BUTTONS */}
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => updateStatus(a.application_id, "reviewed")}
                  className="px-3 py-1 bg-yellow-500 text-white rounded"
                >
                  Mark Reviewed
                </button>

                <button
                  onClick={() => updateStatus(a.application_id, "accepted")}
                  className="px-3 py-1 bg-green-600 text-white rounded"
                >
                  Accept
                </button>

                <button
                  onClick={() => updateStatus(a.application_id, "rejected")}
                  className="px-3 py-1 bg-red-600 text-white rounded"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
