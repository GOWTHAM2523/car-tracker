"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Validation Schema
const schema = z
  .object({
    email: z.string().email("Invalid email address"),
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match!",
    path: ["confirmPassword"],
  });

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  interface User {
    email: string;
    password: string;
  }
  
  interface ForgotPasswordForm {
    email: string;
    newPassword: string;
  }
  
  const onSubmit = (data: ForgotPasswordForm) => {
    setLoading(true);
  
    setTimeout(() => {
      const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
      const userIndex = users.findIndex((user) => user.email === data.email);
  
      if (userIndex === -1) {
        toast.error("Email not found! Please sign up.");
      } else {
        users[userIndex].password = data.newPassword;
        localStorage.setItem("users", JSON.stringify(users));
        toast.success("Password changed successfully!");
        router.push("/login");
      }
  
      setLoading(false);
    }, 2000);
  };
  


  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center text-gray-700">Forgot Password</h1>

        <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              {...register("email")}
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.email?.message && (
              <p className="text-red-500 text-sm mt-1">{String(errors.email.message)}</p>
            )}
          </div>

          {/* New Password Field */}
          <div className="mb-4">
            <label className="block text-gray-700">New Password</label>
            <input
              {...register("newPassword")}
              type="password"
              placeholder="Enter new password"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.newPassword?.message && (
              <p className="text-red-500 text-sm mt-1">{String(errors.newPassword.message)}</p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="mb-4">
            <label className="block text-gray-700">Confirm Password</label>
            <input
              {...register("confirmPassword")}
              type="password"
              placeholder="Confirm new password"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.confirmPassword?.message && (
              <p className="text-red-500 text-sm mt-1">{String(errors.confirmPassword.message)}</p>
            )}
          </div>

          {/* Change Password Button with Loader */}
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
              "Change Password"
            )}
          </button>
        </form>

        {/* Back to Login Link */}
        <div className="mt-4 text-center">
          <a href="/login" className="text-blue-500 hover:underline">
            Back to Login
          </a>
        </div>
      </div>
    </div>
  );
}
