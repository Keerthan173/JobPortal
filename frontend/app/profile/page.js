"use client";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../redux/slices/userSlice";

// Reusable input component
const FormInput = ({
  label,
  type = "text",
  placeholder,
  disabled,
  className,
  value,
  onChange,
}) => (
  <div className={className}>
    <label className="block text-sm text-gray-400 mb-1">{label}</label>

    {type === "textarea" ? (
      <textarea
        rows="2"
        placeholder={placeholder}
        value={value || ""}
        onChange={onChange}
        disabled={disabled}
        className={`w-full p-2 rounded bg-gray-700 text-white border ${
          disabled ? "border-gray-700" : "border-blue-500"
        }`}
      />
    ) : (
      <input
        type={type}
        placeholder={placeholder}
        value={value || ""}
        onChange={onChange}
        disabled={disabled}
        className={`w-full p-2 rounded bg-gray-700 text-white border ${
          disabled ? "border-gray-700" : "border-blue-500"
        }`}
      />
    )}
  </div>
);

const ProfilePage = () => {
  const dispatch = useDispatch();

  // Redux user
  
  const user = useSelector((state) => state.user.user);
  console.log(user);
  const [role, setRole] = useState("candidate");
  // prevent crash → safe empty object
  const [formData, setFormData] = useState({});

  const updateForm = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Load fresh data into formData when Redux user changes
  useEffect(() => {
    if (user?.profile) {
      setFormData(user.profile);
       setRole(user.role);
    }
    console.log("form data",formData);
  }, [user]);

  const [isEditing, setIsEditing] = useState(false);

  // ---------------- SAVE PROFILE ----------------
  const saveProfile = async () => {
    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        alert("Error updating profile");
        return;
      }

      // Update redux with new data
      dispatch(setUser({ ...user, profile: formData }));
      setIsEditing(false);
      alert("Profile updated!");
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  // ---------------- PREVENT WHITE SCREEN ----------------
  if (!user) {
    return (
      <div className="text-white text-center p-10 text-xl">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-gray-800 rounded-2xl shadow-lg border border-gray-700 p-8">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">
            {role === "candidate" ? "Candidate Profile" : "Company Profile"}
          </h1>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
          >
            {isEditing ? "Cancel" : "Edit"}
          </button>
        </div>

        {/* FORM ---------------------------- */}
        <form className="grid md:grid-cols-2 gap-6">
          {/* CANDIDATE FIELDS */}
          {role === "candidate" && (
            <>
              <FormInput
                label="Full Name"
                value={formData.name}
                onChange={(e) => updateForm("name", e.target.value)}
                disabled={!isEditing}
              />

              <FormInput
                label="Email"
                type="email"
                value={user.email}
                onChange={(e) => updateForm("email", e.target.value)}
                disabled={!isEditing}
              />

              <FormInput
                label="Education"
                value={formData.education}
                onChange={(e) => updateForm("education", e.target.value)}
                disabled={!isEditing}
              />

              <FormInput
                type="textarea"
                label="Skills"
                value={formData.skills}
                onChange={(e) => updateForm("skills", e.target.value)}
                disabled={!isEditing}
              />

              <FormInput
                type="textarea"
                className="md:col-span-2"
                label="Experience"
                value={formData.experience}
                onChange={(e) => updateForm("experience", e.target.value)}
                disabled={!isEditing}
              />

              <FormInput
                label="Resume URL"
                type="url"
                value={formData.resume_url}
                onChange={(e) => updateForm("resume_url", e.target.value)}
                disabled={!isEditing}
              />

              <FormInput
                label="LinkedIn"
                type="url"
                value={formData.linkedin}
                onChange={(e) => updateForm("linkedin", e.target.value)}
                disabled={!isEditing}
              />

              <FormInput
                label="Portfolio"
                type="url"
                className="md:col-span-2"
                value={formData.portfolio}
                onChange={(e) => updateForm("portfolio", e.target.value)}
                disabled={!isEditing}
              />
            </>
          )}

          {/* COMPANY FIELDS */}
          {role === "company" && (
            <>
              <FormInput
                label="Company Name"
                value={formData.company_name}
                onChange={(e) => updateForm("company_name", e.target.value)}
                disabled={!isEditing}
              />

              <FormInput
                label="Contact Email"
                type="email"
                value={formData.contact_email}
                onChange={(e) => updateForm("contact_email", e.target.value)}
                disabled={!isEditing}
              />

              <FormInput
                type="textarea"
                className="md:col-span-2"
                label="Description"
                value={formData.description}
                onChange={(e) => updateForm("description", e.target.value)}
                disabled={!isEditing}
              />

              <FormInput
                label="Industry"
                value={formData.industry}
                onChange={(e) => updateForm("industry", e.target.value)}
                disabled={!isEditing}
              />

              <FormInput
                label="Location"
                value={formData.location}
                onChange={(e) => updateForm("location", e.target.value)}
                disabled={!isEditing}
              />

              <FormInput
                label="Website"
                type="url"
                value={formData.website}
                onChange={(e) => updateForm("website", e.target.value)}
                disabled={!isEditing}
              />

              <FormInput
                label="Logo URL"
                type="url"
                value={formData.logo_url}
                onChange={(e) => updateForm("logo_url", e.target.value)}
                disabled={!isEditing}
              />
            </>
          )}
        </form>

        {/* BUTTONS */}
        {isEditing && (
          <div className="mt-8 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg"
            >
              Cancel
            </button>

            <button
              onClick={saveProfile}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
