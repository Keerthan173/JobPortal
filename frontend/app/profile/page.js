"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      setError("No user logged in");
      setLoading(false);
      router.push("/login");
      return;
    }

    fetch(`../api/profile/${userId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch profile");
        return res.json();
      })
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching profile:", err);
        setError("Could not load profile");
        setLoading(false);
      });
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-400 text-lg">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="bg-red-900/20 border border-red-500 text-red-400 px-6 py-4 rounded-lg">
          <p className="font-semibold">⚠️ {error}</p>
          <button
            onClick={() => router.push("/login")}
            className="mt-3 text-sm text-blue-400 hover:text-blue-300 underline"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-gray-900 rounded-t-2xl p-8 shadow-xl">
          <div className="flex items-center space-x-6">
            {/* Avatar */}
            <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </div>

            {/* User Info */}
            <div className="flex-grow">
              <h1 className="text-3xl font-bold text-white mb-2">
                {user.name}
              </h1>
              <p className="text-blue-200 text-lg">{user.email}</p>
              <span className="inline-block mt-3 px-4 py-1 bg-blue-500/30 text-blue-300 rounded-full text-sm font-medium border border-blue-400">
                {user.role === "hr" ? "HR / Employer" : "Job Seeker"}
              </span>
            </div>

            {/* Edit Button */}
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-5 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg border border-white/20 transition backdrop-blur-sm"
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </button>
          </div>
        </div>

        {/* Profile Details */}
        <div className="bg-gray-800 rounded-b-2xl shadow-xl border-t-0 border border-gray-700">
          {/* Account Information Section */}
          <div className="p-8">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
              <span className="text-2xl mr-2">👤</span>
              Account Information
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
                <label className="text-sm text-gray-400 block mb-2">
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    defaultValue={user.name}
                    className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-white font-medium text-lg">{user.name}</p>
                )}
              </div>

              {/* Email */}
              <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
                <label className="text-sm text-gray-400 block mb-2">
                  Email Address
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    defaultValue={user.email}
                    className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-white font-medium text-lg">{user.email}</p>
                )}
              </div>

              {/* Role */}
              <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
                <label className="text-sm text-gray-400 block mb-2">
                  Account Type
                </label>
                <p className="text-white font-medium text-lg capitalize">
                  {user.role}
                </p>
              </div>

              {/* Member Since */}
              <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
                <label className="text-sm text-gray-400 block mb-2">
                  Member Since
                </label>
                <p className="text-white font-medium text-lg">
                  {user.created_at
                    ? new Date(user.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "N/A"}
                </p>
              </div>
            </div>

            {/* Save Button (when editing) */}
            {isEditing && (
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Add your save logic here
                    setIsEditing(false);
                  }}
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-lg transition shadow-lg shadow-blue-500/30"
                >
                  Save Changes
                </button>
              </div>
            )}
          </div>

          {/* Statistics Section (Optional) */}
          <div className="border-t border-gray-700 p-8">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
              <span className="text-2xl mr-2">📊</span>
              Activity Overview
            </h2>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700 text-center">
                <p className="text-3xl font-bold text-blue-400">
                  {user.role === "hr" ? "12" : "5"}
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  {user.role === "hr" ? "Jobs Posted" : "Applications"}
                </p>
              </div>

              <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700 text-center">
                <p className="text-3xl font-bold text-green-400">
                  {user.role === "hr" ? "45" : "2"}
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  {user.role === "hr" ? "Applicants" : "Interviews"}
                </p>
              </div>

              <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700 text-center">
                <p className="text-3xl font-bold text-purple-400">
                  {user.role === "hr" ? "8" : "15"}
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  {user.role === "hr" ? "Active Jobs" : "Profile Views"}
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="border-t border-gray-700 p-6 bg-gray-900/30">
            <div className="flex justify-between items-center">
              <button
                onClick={async () => {
                  if (!confirm("Are you sure you want to delete your account? This action cannot be undone.")) return;

                  const userId = localStorage.getItem("userId");
                  try {
                    const res = await fetch(
                      `http://localhost:5000/profile/${userId}`,
                      {method: "DELETE"}
                    );

                    const data = await res.json();
                    if (!res.ok) {
                      alert(data.message || "Failed to delete account");
                      return;
                    }

                    // Clear localStorage and redirect to home/login
                    localStorage.removeItem("token");
                    localStorage.removeItem("role");
                    localStorage.removeItem("userId");

                    alert("Account deleted successfully");
                    window.location.href = "/"; // or router.push("/signup")
                  } catch (error) {
                    console.error("Delete error:", error);
                    alert("Something went wrong");
                  }
                }}
                className="text-red-400 hover:text-red-300 text-sm font-medium transition"
              >
                Delete Account
              </button>

              <button className="text-blue-400 hover:text-blue-300 text-sm font-medium transition">
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
