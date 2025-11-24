"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import { FileText, Upload, Pencil, Send } from "lucide-react";

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
    } else {
      alert(data.message);
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-200">
        {/* Title */}
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
          <FileText size={28} /> Apply for Job
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Resume Field */}
          <div>
            <label className="block mb-1 font-medium flex items-center gap-2">
              <Upload size={18} /> Resume URL
            </label>
            <input
              className="border w-full p-3 rounded-lg focus:ring focus:ring-blue-300 outline-none"
              placeholder="Paste your resume link (Google Drive, Cloudinary, etc.)"
              value={resumeUrl}
              onChange={(e) => setResumeUrl(e.target.value)}
              required
            />
          </div>

          {/* Cover Letter */}
          <div>
            <label className="block mb-1 font-medium flex items-center gap-2">
              <Pencil size={18} /> Cover Letter
            </label>
            <textarea
              className="border w-full p-3 rounded-lg h-40 focus:ring focus:ring-blue-300 outline-none"
              placeholder="Write something about why you're a good fit..."
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
            ></textarea>
          </div>

          {/* Submit Button */}
          <button onClick={()=>router.push("/dashboard/candidate/applications")} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl flex items-center justify-center gap-2 transition shadow">
            <Send size={18} /> Submit Application
          </button>
        </form>
      </div>
    </div>
  );
}
