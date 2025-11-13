"use client";

import { cookies } from "next/headers";
import { useState } from "react";

export default function CandidateProfile() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-gray-800 rounded-2xl shadow-lg border border-gray-700 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Candidate Profile</h1>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
          >
            {isEditing ? "Cancel" : "Edit"}
          </button>
        </div>

        {/* Profile Form */}
        <form className="grid md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              disabled={!isEditing}
              className={`w-full p-2 rounded bg-gray-700 text-white border ${
                isEditing ? "border-blue-500" : "border-gray-700"
              }`}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email address"
              disabled={!isEditing}
              className={`w-full p-2 rounded bg-gray-700 text-white border ${
                isEditing ? "border-blue-500" : "border-gray-700"
              }`}
            />
          </div>

          {/* Education */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">Education</label>
            <input
              type="text"
              placeholder="e.g. B.E in Computer Science"
              disabled={!isEditing}
              className={`w-full p-2 rounded bg-gray-700 text-white border ${
                isEditing ? "border-blue-500" : "border-gray-700"
              }`}
            />
          </div>

          {/* Skills */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">Skills</label>
            <textarea
              rows="2"
              placeholder="e.g. React, Node.js, MySQL, Tailwind CSS"
              disabled={!isEditing}
              className={`w-full p-2 rounded bg-gray-700 text-white border ${
                isEditing ? "border-blue-500" : "border-gray-700"
              }`}
            />
          </div>

          {/* Experience */}
          <div className="md:col-span-2">
            <label className="block text-sm text-gray-400 mb-1">Experience</label>
            <textarea
              rows="3"
              placeholder="Briefly describe your experience"
              disabled={!isEditing}
              className={`w-full p-2 rounded bg-gray-700 text-white border ${
                isEditing ? "border-blue-500" : "border-gray-700"
              }`}
            />
          </div>

          {/* Resume URL */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">Resume URL</label>
            <input
              type="url"
              placeholder="https://your-resume-link.com"
              disabled={!isEditing}
              className={`w-full p-2 rounded bg-gray-700 text-white border ${
                isEditing ? "border-blue-500" : "border-gray-700"
              }`}
            />
          </div>

          {/* LinkedIn */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">LinkedIn</label>
            <input
              type="url"
              placeholder="https://linkedin.com/in/yourname"
              disabled={!isEditing}
              className={`w-full p-2 rounded bg-gray-700 text-white border ${
                isEditing ? "border-blue-500" : "border-gray-700"
              }`}
            />
          </div>

          {/* Portfolio */}
          <div className="md:col-span-2">
            <label className="block text-sm text-gray-400 mb-1">Portfolio</label>
            <input
              type="url"
              placeholder="https://yourportfolio.com"
              disabled={!isEditing}
              className={`w-full p-2 rounded bg-gray-700 text-white border ${
                isEditing ? "border-blue-500" : "border-gray-700"
              }`}
            />
          </div>
        </form>

        {/* Action Buttons */}
        {isEditing && (
          <div className="mt-8 flex justify-end space-x-3">
            <button
              onClick={() => setIsEditing(false)}
              type="button"
              className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-lg transition"
            >
              Save Changes
            </button>
          </div>
        )}

        {/* Footer Actions */}
        <div className="border-t border-gray-700 mt-10 pt-6 flex justify-between items-center">
          <button className="text-red-400 hover:text-red-300 text-sm font-medium">
            Delete Account
          </button>
          <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
}
