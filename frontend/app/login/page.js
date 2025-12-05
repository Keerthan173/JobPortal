"use client"; // tells Next.js this is a client-side component

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("../api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Login failed");
        return;
      }

      // ✅ Role-based redirect
      switch (data.user.role) {
        case "company":
          router.push("/dashboard/company");
          break;
        case "candidate":
          router.push("/dashboard/candidate");
          break;
        default:
          router.push("/");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex ">
      <form
        onSubmit={handleLogin}
        className="p-7 w-96 shadow-md bg-white rounded-lg"
      >
        <h2 className="text-center font-bold mb-6 text-2xl">Login</h2>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring focus:ring-blue-300"
          required
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring focus:ring-blue-300"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition"
        >
          Login
        </button>

        <p className="mt-5 text-sm text-center">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-blue-600 hover:underline">
            Signup here
          </Link>
        </p>
      </form>
      <div className="flex min-h-full justify-center items-center bg-white">
        <Image
          src="/images/loginPageBG1.jpg"
          width={300}
          height={300}
          alt="Login page image"
        />
      </div>
      </div>
    </div>
  );
}
