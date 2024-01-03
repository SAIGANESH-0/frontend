"use client";
import { useState, useContext, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

import { toast } from "react-toastify";
import { AiOutlineLogin } from "react-icons/ai";

const Login = () => {
  const [name, setname] = useState("");
  const [pass, setpass] = useState("");
  const router = useRouter();

  useEffect(() => {
    document.title = "Login Archanum";
  });

  const handlelogin = async (e) => {
    e.preventDefault();
    try {
      const res = await toast.promise(
        axios.post("https://archanum.onrender.com/login", {
          username: name,
          password: pass,
        }),
        {
          pending: "Logging in...",
          success: "You are logged in!",
          error: "An error occurred during login.",
        }
      );

      if (res.status == 200) {
        if (typeof sessionStorage !== "undefined") {
          sessionStorage.setItem("loggedIn", "true");
        }
        router.push("/");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex flex-col items-center  bg-black justify-center h-screen">
      <AiOutlineLogin className="h-8 w-8 text-white my-3" />
      <h1 className="text-4xl text-white font-bold mb-8">Sign in</h1>

      <form className="w-96">
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block text-white text-sm font-bold mb-2"
          >
            Username
          </label>
          <input
            type="text"
            value={name}
            id="name"
            onChange={(e) => setname(e.target.value)}
            placeholder="Enter your name"
            required
            className="border rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-300"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-white text-sm font-bold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={pass}
            required
            onChange={(e) => setpass(e.target.value)}
            placeholder="Enter your password"
            className="border rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-300"
          />
        </div>

        <div className="flex gap-3 justify-center items-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={(e) => handlelogin(e)}
          >
            Log in
          </button>
          <Link
            className="text-blue-500 hover:text-blue-700 font-bold"
            href="signup"
          >
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
