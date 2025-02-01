"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Validation Schema
const schema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false); // Fix for hydration mismatch

  // Ensure component is only rendered after mounting to prevent hydration errors
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <div className="flex justify-center items-center min-h-screen">Loading...</div>; // Prevent SSR/CSR mismatch

  interface User {
    username: string;
    email: string;
    password: string;
  }
  
  interface SignupForm {
    username: string;
    email: string;
    password: string;
  }
  
  const onSubmit = (data: SignupForm) => {
    setLoading(true);
  
    setTimeout(() => {
      const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
      const exists = users.some((user) => user.email === data.email);
  
      if (exists) {
        toast.error("Email already registered");
      } else {
        users.push(data);
        localStorage.setItem("users", JSON.stringify(users));
        toast.success("Signup successful! Please login.");
        router.push("/login");
      }
  
      setLoading(false);
    }, 2000);
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center text-gray-700">Sign Up</h1>

        <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Username Field */}
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              {...register("username")}
              type="text"
              placeholder="Enter your username"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
            />
            {errors?.username?.message && (
              <p className="text-red-500 text-sm mt-1">{String(errors?.username?.message)}</p>
            )}
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              {...register("email")}
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
            />
            {errors?.email?.message && (
              <p className="text-red-500 text-sm mt-1">{String(errors?.email?.message)}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              {...register("password")}
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
            />
            {errors?.password?.message && (
              <p className="text-red-500 text-sm mt-1">{String(errors?.password?.message)}</p>
            )}
          </div>

          {/* Sign Up Button with Loader */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center items-center bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 018 8h-4l3 3 3-3h-4a8 8 0 01-8 8v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
                ></path>
              </svg>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        {/* Already have an account? Login Link */}
        <div className="mt-4 text-center">
          <span className="text-gray-600">Already have an account? </span>
          <a href="/login" className="text-blue-500 hover:underline">
            Login
          </a>
        </div>
      </div>
    </div>
  );
}
