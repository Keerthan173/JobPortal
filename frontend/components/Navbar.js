// // "use client";

// // import { useRouter } from "next/navigation";

// // export default function Navbar() {
// //   const router = useRouter();

// //   const handleLogout = () => {
// //     localStorage.removeItem("token"); // remove JWT token
// //     localStorage.removeItem("role");  // remove role info
// //     router.push("/login");            // redirect to login page
// //   };

// //   return (
// //     <nav className="w-full bg-blue-600 p-4 flex justify-between items-center">
// //       <h1 className="text-white font-bold text-lg">Job Portal</h1>
// //       <button
// //         onClick={handleLogout}
// //         className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100"
// //       >
// //         Logout
// //       </button>
// //     </nav>
// //   );
// // }

"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);

  // Function to check login status
  const checkAuth = () => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role");

    if (token) {
      setIsLoggedIn(true);
      setRole(userRole);
    } else {
      setIsLoggedIn(false);
      setRole(null);
    }
  };

  // Run check on page load + whenever route changes
  useEffect(() => {
    checkAuth();
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    setRole(null);
    router.push("/login");
  };

  return (
    <nav className="w-full bg-black text-white px-6 py-4 flex justify-between items-center shadow-md">
      {/* Logo */}
      <h1
        className="text-xl font-bold cursor-pointer text-blue-400 hover:text-blue-300 transition"
        onClick={() => router.push("/")}
      >
        HireHub
      </h1>

      {/* Links */}
      <div className="flex gap-6 items-center">
        {!isLoggedIn ? (
          <>
            <button onClick={() => router.push("/login")} className="hover:text-blue-400">Login</button>
            <button onClick={() => router.push("/signup")} className="hover:text-blue-400">Signup</button>
          </>
        ) : (
          <>
            <button onClick={() => router.push("/jobs")} className="hover:text-blue-400">Jobs</button>
            <button onClick={() => router.push("/profile")} className="hover:text-blue-400">Profile</button>

            {role === "recruiter" && (
              <button onClick={() => router.push("/post-job")} className="hover:text-blue-400">
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
