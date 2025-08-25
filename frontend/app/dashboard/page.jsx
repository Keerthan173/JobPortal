"use client";

import { useRouter } from "next/navigation";  // router hook - used to move between pages
import { useState } from "react";

export default function Dashboard() {
  const [username] = useState("Keerthan");
  const router = useRouter();   // initializing the router

  const handleLogout = () => {
    // later we’ll clear session/token here
    router.push("/login"); // redirect to login page
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="p-8 rounded-2xl shadow-lg bg-white w-[400px] text-center">
        <h1 className="text-2xl font-bold mb-4">Welcome, {username} 👋</h1>
        <p className="text-gray-600 mb-6">You have successfully logged in.</p>

        <button
          onClick={handleLogout}
          className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
