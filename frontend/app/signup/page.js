"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector,useDispatch } from "react-redux";
import {setUser} from "@/app/redux/slices/userSlice"
import Image from "next/image";

const SignUp = () => {
  const dispatch = useDispatch();
  const [selectrole, setSelectrole] = useState("candidate");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "candidate",
    companyName: "",
    companyWebsite: "",
  });

  const router = useRouter();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const {
      name,
      email,
      password,
      confirmPassword,
      role,
      companyName,
      companyWebsite,
    } = formData;
    console.log("ROLE:", role);
    if (password != confirmPassword) {
      alert("Password do not match");
      return;
    }
    if (!role) {
      alert("Please select a role!");
      return;
    }
    if (role === "company" && !companyName) {
      alert("Please enter your company name!");
      return;
    }
    try {
      const res = await fetch("../api/signUp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          confirmPassword,
          role,
          companyName,
          companyWebsite,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        dispatch(setUser(data.user))
        router.push("/login");
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("⚠️ Server error. Please try again later.");
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 min-h-screen ">
      <div className="flex ">
      <form
        onSubmit={handleSignup}
        className="p-7 w-96 shadow-md bg-white rounded-lg"
      >
        <h2 className="text-center font-bold mb-4 text-2xl text-gray-700">
          Create an Account
        </h2>
        <div
          // name="role"
          // value={formData.role}
          // onChange={handleChange}
          className="flex items-center w-full  mb-3 rounded-3xl text-gray-500 bg-blue-200"
          required
        >
          <span
            className={`flex justify-center items-center p-2 w-full cursor-pointer rounded-l-3xl ${
              selectrole === "candidate" ? "bg-black text-white" : ""
            }  hover:bg-blue-400`}
            onClick={() => {
             setFormData({ ...formData, role: "candidate" });
              setSelectrole("candidate");
            }}
          >
            Candidate
          </span>
          <span
            className={`p-2 w-full cursor-pointer rounded-r-3xl flex justify-center items-center ${
              selectrole === "company" ? "bg-black text-white" : ""
            }  hover:bg-blue-400`}
            onClick={() => {
              setFormData({...formData,role:"company"})
              setSelectrole("company");
            }}
          >
            company
          </span>
        </div>
        {selectrole === "candidate" && (
          <>
            {/* Name */}
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 mb-3 border rounded"
              required
            />

            {/* Email */}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 mb-3 border rounded"
              required
            />

            {/* Password */}
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 mb-3 border rounded"
              required
            />

            {/* Confirm Password */}
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-2 mb-3 border rounded"
              required
            />
          </>
        )}

        {/* Role Selection */}

        {/* Company Details (only if HR) */}
        {selectrole === "company" && (
          <>
            <input
              type="text"
              name="companyName"
              placeholder="Company Name"
              value={formData.companyName}
              onChange={handleChange}
              className="w-full p-2 mb-3 border rounded"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Company Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 mb-3 border rounded"
              required
            />

            {/* Password */}
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 mb-3 border rounded"
              required
            />

            {/* Confirm Password */}
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-2 mb-3 border rounded"
              required
            />
            <input
              type="text"
              name="companyWebsite"
              placeholder="Company Website (optional)"
              value={formData.companyWebsite}
              onChange={handleChange}
              className="w-full p-2 mb-3 border rounded"
            />
          </>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition"
        >
          Sign Up
        </button>

        <p className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <Link href="/login" className="text-green-600 hover:underline">
            Login here
          </Link>
        </p>
      </form>
      <div className="flex min-h-full justify-center items-center bg-white">
      <Image
      src="/images/loginPageBG.jpg"
      width={500}
      height={500}
      alt="Login page image"
      />
      </div>
    </div>
    </div>
  );
};

export default SignUp;
