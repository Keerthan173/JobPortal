"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditJob() {
  const router = useRouter();
  const { id } = useParams();

  const [form, setForm] = useState(null);

  useEffect(() => {
    if (!id) return;
    const fetchJob = async () => {
      const res = await fetch(`/api/jobs?id=${id}`);
      const data = await res.json();
      setForm(data.job);
    };
    fetchJob();
  }, [id]);

  if (!form) return <p>Loading...</p>;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`/api/jobs?id=${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert("Job updated successfully");
      router.push("/dashboard/company/manage-jobs");
    } else {
      alert("Failed to update job");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Edit Job</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* TITLE */}
        <div>
          <label className="block mb-1 font-medium">Job Title</label>
          <input
            name="title"
            className="border p-2 w-full rounded"
            value={form.title || ""}
            onChange={handleChange}
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="block mb-1 font-medium">Job Description</label>
          <textarea
            name="description"
            className="border p-2 w-full rounded"
            value={form.description || ""}
            onChange={handleChange}
            rows={4}
          />
        </div>

        {/* LOCATION */}
        <div>
          <label className="block mb-1 font-medium">Location</label>
          <input
            name="location"
            className="border p-2 w-full rounded"
            value={form.location || ""}
            onChange={handleChange}
          />
        </div>

        {/* SALARY */}
        <div>
          <label className="block mb-1 font-medium">Salary</label>
          <input
            name="salary"
            className="border p-2 w-full rounded"
            value={form.salary || ""}
            onChange={handleChange}
          />
        </div>

        {/* JOB TYPE */}
        <div>
          <label className="block mb-1 font-medium">Job Type</label>
          <select
            name="job_type"
            className="border p-2 w-full rounded"
            value={form.job_type || ""}
            onChange={handleChange}
          >
            <option value="full-time">Full Time</option>
            <option value="part-time">Part Time</option>
            <option value="internship">Internship</option>
          </select>
        </div>

        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Update Job
        </button>
      </form>
    </div>
  );
}
