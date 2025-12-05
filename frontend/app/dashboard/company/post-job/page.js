"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import {
  Briefcase,
  FileText,
  MapPin,
  IndianRupee,
  CalendarDays,
  ListChecks,
} from "lucide-react";

export default function PostJob() {
  const user = useSelector((state) => state.user.user);
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    description: "",
    requirements: "",
    location: "",
    salary: "",
    job_type: "full-time",
    deadline: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || user.role !== "company") {
      alert("Only companies can post jobs!");
      return;
    }

    const res = await fetch("/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, company_id: user.profile.id }),
    });

    if (res.ok) {
      alert("Job posted successfully!");
      router.push("/dashboard/company/manage-jobs");
    } else {
      alert("Failed to post job");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <Briefcase className="text-blue-600" /> Post a New Job
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded-xl shadow border"
      >
        {/* Job Title */}
        <div className="flex items-center gap-2 border rounded-lg p-3">
          <FileText className="text-gray-500" />
          <input
            type="text"
            name="title"
            placeholder="Job Title"
            className="w-full outline-none"
            onChange={handleChange}
          />
        </div>

        {/* Description */}
        <div className="flex items-start gap-2 border rounded-lg p-3">
          <ListChecks className="text-gray-500 mt-1" />
          <textarea
            name="description"
            placeholder="Job Description"
            className="w-full outline-none"
            rows="4"
            onChange={handleChange}
          />
        </div>

        {/* Requirements */}
        <div className="flex items-start gap-2 border rounded-lg p-3">
          <ListChecks className="text-gray-500 mt-1" />
          <textarea
            name="requirements"
            placeholder="Requirements"
            className="w-full outline-none"
            rows="3"
            onChange={handleChange}
          />
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 border rounded-lg p-3">
          <MapPin className="text-gray-500" />
          <input
            type="text"
            name="location"
            placeholder="Location (e.g., Delhi)"
            className="w-full outline-none"
            onChange={handleChange}
          />
        </div>

        {/* Salary */}
        <div className="flex items-center gap-2 border rounded-lg p-3">
          <IndianRupee className="text-gray-500" />
          <input
            type="text"
            name="salary"
            placeholder="Salary (e.g., 6 LPA)"
            className="w-full outline-none"
            onChange={handleChange}
          />
        </div>

        {/* Job Type */}
        <div className="border rounded-lg p-3">
          <select
            name="type"
            className="w-full outline-none bg-transparent"
            onChange={handleChange}
          >
            <option value="full-time">full-time</option>
            <option value="part-time">part-time</option>
            <option value="remote">remote</option>
            <option value="contract">contract</option>
            <option value="remote">remote</option>
          </select>
        </div>

        {/* Deadline */}
        <div className="flex items-center gap-2 border rounded-lg p-3">
          <CalendarDays className="text-gray-500" />
          <input
            type="date"
            name="deadline"
            className="w-full outline-none"
            onChange={handleChange}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Post Job
        </button>
      </form>
    </div>
  );
}
