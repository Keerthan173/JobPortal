"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";

export default function ApplyJob({ params }) {
  const { id: jobId } = use(params);
  const router = useRouter();

  const [resumeUrl, setResumeUrl] = useState("");
  const [coverLetter, setCoverLetter] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch("/api/applications", {
      method: "POST",
      body: JSON.stringify({
        job_id: jobId,
        resume_url: resumeUrl,
        cover_letter: coverLetter,
      }),
      credentials: "include",
    });
    const data = await res.json();

    if (res.ok) {
      alert("Application submitted successfully!");
      router.push("/dashboard/candidate/applications");
      console.log(data.message);
    } else {
      alert(`${data.message}`);
      console.log(data.message);
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Apply for Job</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="border w-full p-2"
          placeholder="Resume URL (Cloudinary link)"
          value={resumeUrl}
          onChange={(e) => setResumeUrl(e.target.value)}
          required
        />

        <textarea
          className="border w-full p-2 h-40"
          placeholder="Cover Letter"
          value={coverLetter}
          onChange={(e) => setCoverLetter(e.target.value)}
        ></textarea>

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Submit Application
        </button>
      </form>
    </div>
  );
}
