"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import CarTrackingUI from '../components/CarTrackingUI';

export default function Home() {
  const router = useRouter();
  const [theme, setTheme] = useState("dark");

  // Ensure user is logged in
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      router.push("/login");
    }
  }, [router]);

  // Load theme from localStorage
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.classList.toggle("dark", storedTheme === "dark");
    }
  }, []);


  // Logout
  const handleLogout = () => {
    if (confirm("Are you sure you want to log out?")) {
      localStorage.removeItem("user");
      router.push("/login");
    }
  };

  const SignOutIcon = ({ width = 25, height = 25, color = "white", className = "" }) => {
    return (
      <svg
        fill={color}
        width={width}
        height={height}
        viewBox="0 0 384.971 384.971"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <g id="Sign_Out">
          <path d="M180.455,360.91H24.061V24.061h156.394c6.641,0,12.03-5.39,12.03-12.03s-5.39-12.03-12.03-12.03H12.03
                  C5.39,0.001,0,5.39,0,12.031V372.94c0,6.641,5.39,12.03,12.03,12.03h168.424c6.641,0,12.03-5.39,12.03-12.03
                  C192.485,366.299,187.095,360.91,180.455,360.91z"/>
          <path d="M381.481,184.088l-83.009-84.2c-4.704-4.752-12.319-4.74-17.011,0c-4.704,4.74-4.704,12.439,0,17.179l62.558,63.46H96.279
                  c-6.641,0-12.03,5.438-12.03,12.151c0,6.713,5.39,12.151,12.03,12.151h247.74l-62.558,63.46c-4.704,4.752-4.704,12.439,0,17.179
                  c4.704,4.752,12.319,4.752,17.011,0l82.997-84.2C386.113,196.588,386.161,188.756,381.481,184.088z"/>
        </g>
      </svg>
    );
  };

  // Function to toggle theme
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.body.classList.remove("light", "dark");
    document.body.classList.add(newTheme);
  };

  // Apply the theme on initial load
  useEffect(() => {
    if (theme) {
      document.body.classList.add(theme);
    } 

  }, [theme]);

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen  transition-all ${theme === "light" ? "bg-light" : "bg-dark"}`}>
      {/* Theme Toggle */}
      <div className="absolute top-4 right-4 flex items-center gap-4">
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white transition-all hover:scale-105 shadow-md"
        >
          {theme === "light" ? <FiMoon size={24} /> : <FiSun size={24} />}
        </button>

        {/* Logout Button */}
        <button
          className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all shadow-md hover:scale-105"
          onClick={handleLogout}
        >
          <SignOutIcon width={24} height={24} color="white" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
      <CarTrackingUI />


    </div>
  );
}


