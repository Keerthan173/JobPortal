"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try{
      const res = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({name, email, password, role})
      });

      const data = await res.json();
      if(res.ok){
        alert(data.message);
        router.push('/login');  // go to login after signup
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("⚠️ Server error. Please try again later.");
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 min-h-screen">
      <form
        onSubmit={handleSignup}
        className="p-7 w-96 shadow-md bg-white rounded"
      >
        <h2 className="text-center font-bold m-4 text-2xl">Signup</h2>

        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 mb-3 border rounded"
          required
        />

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-3 border rounded"
          required
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-3 border rounded"
          required
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-2 mb-3 border rounded"
          required
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-2 mb-3 border rounded text-gray-500"
        >
          <option value="" disabled>Select Role</option>
          <option value="candidate">Candidate</option>
          <option value="hr">HR</option>
        </select>

        <button
          type="submit"
          className="w-full bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
        >
          Signup
        </button>

        <p className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <Link href="/login" className="text-green-600 hover:underline">
            Login here
          </Link>
        </p>

      </form>
    </div>
  );
}