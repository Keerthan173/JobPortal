"use client";
import Link from "next/link";

export default function CandidateDashboard() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Candidate Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          href="/dashboard/candidate/applications"
          className="border p-6 rounded-lg shadow hover:bg-gray-100"
        >
          <h2 className="text-xl font-bold">My Applications</h2>
          <p className="text-gray-600 mt-2">
            View all jobs you applied for and track your status.
          </p>
        </Link>

        <Link
          href="/jobs"
          className="border p-6 rounded-lg shadow hover:bg-gray-100"
        >
          <h2 className="text-xl font-bold">Browse Jobs</h2>
          <p className="text-gray-600 mt-2">
            Find new opportunities and apply easily.
          </p>
        </Link>

        <Link
          href="/dashboard/candidate/profile"
          className="border p-6 rounded-lg shadow hover:bg-gray-100"
        >
          <h2 className="text-xl font-bold">My Profile</h2>
          <p className="text-gray-600 mt-2">
            Update bio, resume, and personal information.
          </p>
        </Link>
      </div>
    </div>
  );
}
