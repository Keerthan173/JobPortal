"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser, clearUser } from "@/app/redux/slices/userSlice";

export default function UserLoader() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/profile", {
          credentials: "include",
        });

        if (!res.ok) {
          dispatch(clearUser());
          return;
        }

        const user = await res.json();
        dispatch(setUser(user));
        console.log(user);
      } catch (err) {
        console.error("Failed to load user:", err);
        dispatch(clearUser());
      }
    };

    fetchUser();
  }, [dispatch]);

  return null; // ✅ correct
}
