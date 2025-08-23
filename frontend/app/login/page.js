"use client" // tells Next.js this is a client-side component (needed for useState).

import { useState } from "react" 
export default function Login(){ 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) =>{
    e.preventDefault();
    console.log("Email:", email, "Password:", password);
    alert("Login form submitted(Frontend only)");
  }
  
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
      </form>
    </div>
  )
}
