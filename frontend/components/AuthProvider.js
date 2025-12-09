"use client"
import {  useEffect } from "react"
import React from 'react'
import { useDispatch } from "react-redux";
import { setUser ,clearUser} from "@/app/redux/slices/userSlice";

const AuthProvider = () => {
    const dispatch=useDispatch();
    useEffect(()=>{
        const LoadUser=async()=>{
            try{
                const res=await fetch("/api/profile",{
                    method:"GET",
                    credentials:"include"
                })
                if(!res.ok)
                {
                    throw new Error();
                }
                const data=await res.json();
                dispatch(setUser(data));
            }
            catch{
                    dispatch(clearUser())
            }
        }
        LoadUser();

    },[dispatch]);
  return children;
};

export default AuthProvider