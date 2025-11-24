"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSelector, } from "react-redux";
export default function Navbar() {
  const user= useSelector((state) => state.user.user);
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);
  // Check login status via cookie (call /api/profile)
  const checkAuth = async () => {
    try {
      const res = await fetch("/api/protected"); // cookie sent automatically
      const data = await res.json();

      if (res.ok) {
        setIsLoggedIn(true);
        setRole(data.user.role);
      } else {
        setIsLoggedIn(false);
        setRole(null);
      }
    } catch (err) {
      setIsLoggedIn(false);
      setRole(null);
    }
  };

  useEffect(() => {
    checkAuth();
  }, [pathname]);

  const handleLogout = async () => {
    try {
      await fetch("/api/logOut", { method: "POST" });
      setIsLoggedIn(false);
      setRole(null);
      router.push("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <nav className="w-full bg-black text-white px-6 py-4 flex justify-between items-center shadow-md">
      <h1
        className="text-xl font-bold cursor-pointer text-blue-400 hover:text-blue-300 transition"
        onClick={() => router.push("/")}
      >
        HireHub
      </h1>

      <div className="flex gap-6 items-center">
        {!isLoggedIn ? (
          <>
            <button
              onClick={() => router.push("/login")}
              className="hover:text-blue-400"
            >
              Login
            </button>
            <button
              onClick={() => router.push("/signup")}
              className="hover:text-blue-400"
            >
              Signup
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => router.push(`${user?.role==="candidate"?"/dashboard/candidate":"/dashboard/company"}`)}
              className="hover:text-blue-400"
            >
              DashBoard
            </button>
            <button
              onClick={() => router.push("/profile")}
              className="hover:text-blue-400"
            >
              Profile
            </button>

            {user?.role === "company" && (
              <button
                onClick={() => router.push("/dashboard/company/post-job")}
                className="hover:text-blue-400"
              >
                Post Job
              </button>
            )}

            <button
              onClick={handleLogout}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
