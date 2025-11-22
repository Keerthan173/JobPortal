"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../app/redux/slices/userSlice";

export default function UserLoader() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/profile", {
          method: "GET",
          credentials: "include",   // ensures cookies are sent
        });

        if (!res.ok) {
          console.warn("User not logged in");
          return;
        }

        const user = await res.json();
        // console.log("userLoader",user)
        dispatch(setUser(user));   // Save user in Redux
      } catch (err) {
        console.error("Failed to load user:", err);
      }
    }

    fetchUser();
  }, []);

  return null;
}
