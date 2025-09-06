"use client" // tells Next.js this is a client-side component (needed for hooks).

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react" 

export default function Login(){ 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleLogin = async (e) =>{
    e.preventDefault();

    try{
      // Send login request to backend
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email, password})
      });

      const data = await res.json();

      if(!res.ok){
        alert(data.message || "Login failed");
        return;
      }

      // Save token in localStorage (or cookie later)
      localStorage.setItem("token", data.token);

      // Redirect based on role
      if (data.user.role === "hr") {
        router.push("/hr-dashboard");
      } else if (data.user.role === "candidate") {
        router.push("/candidate-dashboard");
      } else {
        router.push("/"); // fallback
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong");
    }
  };
  
  return( 
    <div className="flex items-center justify-center bg-gray-100 min-h-screen">
      <form onSubmit={handleLogin} className="p-7 w-96 shadow-md bg-white">
        <h2 className="text-center font-bold m-4 text-2xl">Login</h2>
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
        <button type="submit" className=" w-full bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"> 
          Login
        </button>

        <p className="mt-5 text-sm text-center">
          Don't have an account?{" "}
          <Link href="/signup" className="text-blue-600 hover:underline">
            Signup here
          </Link>
        </p>
      </form>
    </div>
  )
}
