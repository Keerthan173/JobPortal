"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";

export default function PostJob() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    description: "",
    requirements: "",
    location: "",
    salary_range: "",
    type: "job",
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
      <h2 className="text-2xl font-bold mb-4">Post a New Job</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Job Title"
          className="border p-2 w-full"
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Job Description"
          className="border p-2 w-full"
          rows="4"
          onChange={handleChange}
        />

        <textarea
          name="requirements"
          placeholder="Requirements"
          className="border p-2 w-full"
          rows="3"
          onChange={handleChange}
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          className="border p-2 w-full"
          onChange={handleChange}
        />

        <input
          type="text"
          name="salary_range"
          placeholder="Salary Range"
          className="border p-2 w-full"
          onChange={handleChange}
        />

        <select
          name="type"
          className="border p-2 w-full"
          onChange={handleChange}
        >
          <option value="job">Job</option>
          <option value="internship">Internship</option>
        </select>

        <input
          type="date"
          name="deadline"
          className="border p-2 w-full"
          onChange={handleChange}
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Post Job
        </button>
      </form>
    </div>
  );
}
