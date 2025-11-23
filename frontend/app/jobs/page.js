// "use client";

// import { useEffect, useState } from "react";

// export default function JobsPage() {
//   const [jobs, setJobs] = useState([]);

//   useEffect(() => { // A React Hook that lets you run side effects(things outside the UI: fetching data, timers) 
//     fetch("../api/jobs") // calls backend API - By default, fetch() uses HTTP GET method.
//     .then((res) => res.json()) // When the server responds, we get a Response object (res).
//     // .json() converts the response body into actual JavaScript object/array.
//     .then((data) => setJobs(data)) // updates React state → triggers re-render with new jobs list 
//     .catch((err) => console.error("Error fetching jobs:", err)); 
//   },[]); // The second argument [] means → run only once when the page/component loads.

//   return (
//     <div className="min-h-screen bg-gray-900 py-10 px-4">
//       <div className="max-w-6xl mx-auto">
//         <h1 className="text-3xl font-bold text-white mb-8 text-center">
//           Available Jobs
//         </h1>

//         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//           {jobs.map((job, index) => (
//             <div
//               key={index}
//               className="bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow p-6 border border-gray-700 flex flex-col"
//             >
//               <div className="flex-grow">
//                 <h2 className="text-xl font-semibold text-blue-400 mb-2">
//                   {job.title}
//                 </h2>
//                 <p className="text-gray-300 font-medium">
//                   {job.company} <span className="text-gray-500">• {job.location}</span>
//                 </p>
//                 <p className="text-gray-400 mt-3 line-clamp-3">
//                   {job.description}
//                 </p>
//                 <p className="text-sm text-gray-500 mt-4">
//                   Posted on {new Date(job.created_at).toLocaleDateString()}
//                 </p>
//               </div>

//               <button className="mt-5 w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white py-2 rounded-xl transition shadow-lg shadow-blue-500/30">
//                 Apply Now
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }