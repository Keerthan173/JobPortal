"use client";

import { useEffect, useState } from "react";

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => { // A React Hook that lets you run side effects(things outside the UI: fetching data, timers) 
    fetch("http://localhost:5000/jobs") // calls backend API 
    .then((res) => res.json()) // When the server responds, we get a Response object (res)..json() converts the response body into actual JavaScript object/array.
    .then((data) => setJobs(data)) // updates React state → triggers re-render with new jobs list 
    .catch((err) => console.error("Error fetching jobs:", err)); 
  },[]); // The second argument [] means → run only once when the page/component loads.

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Available Jobs
        </h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow p-6"
            >
              <h2 className="text-xl font-semibold text-indigo-600 mb-2">
                {job.title}
              </h2>
              <p className="text-gray-700 font-medium">
                {job.company} <span className="text-gray-500">• {job.location}</span>
              </p>
              <p className="text-gray-600 mt-3 line-clamp-3">
                {job.description}
              </p>
              <p className="text-sm text-gray-400 mt-4">
                Posted on {new Date(job.created_at).toLocaleDateString()}
              </p>
              <button className="mt-5 w-full bg-indigo-600 text-white py-2 rounded-xl hover:bg-indigo-700 transition">
                Apply Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}