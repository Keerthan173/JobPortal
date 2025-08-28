"use client";
/*
  - This tells Next.js that the file should run on the client side (in the browser) rather than the server.
  - Needed because you’re using React hooks (useState) which only work on the client.
*/
import { useState } from "react";

export default function NewJobPage() {
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },    // tells the server that we’re sending JSON
        body: JSON.stringify(form),     // converts the form object into JSON format to send.
      });

      if (res.ok) {
        alert("Job added successfully!");
        setForm({ title: "", company: "", location: "", description: "" }); // reset form
      } else {
        alert("Error adding job");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Post a New Job
        </h1>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job Title
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g. Frontend Developer"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Company Name
            </label>
            <input
              type="text"
              name="company"
              value={form.company}
              onChange={handleChange}
              placeholder="e.g. OpenAI"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="e.g. Remote / New York"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Write a short job description..."
              rows={4}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2.5 rounded-lg hover:bg-blue-700 transition shadow-md"
          >
            Post Job
          </button>
        </form>
      </div>
    </div>
  );
}


/*
Here’s what happens step by step when you submit the form:

1. **Frontend (Next.js form)** →
   When you click **Post Job**, `handleSubmit()` runs.
   It sends a `POST` request to:

   ```
   http://localhost:5000/jobs
   ```

   with the job details in JSON.

2. **Backend (Express API)** →
   The `POST /jobs` route receives it, and runs this query:

   ```sql
   INSERT INTO jobs (title, company, location, description, created_at) 
   VALUES (?, ?, ?, ?, NOW())
   ```

   So a new row is inserted in your **MySQL `jobs` table**.

3. **Database (MySQL)** →
   The new job entry is stored permanently in your DB.

4. **Response back** →
   Express responds with `{ message: "Job added", jobId: <new id> }`.
   On frontend you’ll see **"Job added successfully!"** alert.

5. If you refresh `/jobs`, the new job will appear in the job list ✅


*/