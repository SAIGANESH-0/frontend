"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { FaSmile } from "react-icons/fa";

const Signup = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [pass, setpass] = useState("");
  const router = useRouter();

  useEffect(() => {
    document.title = "Register Archanum";
  });

  const handlesignup = async (e) => {
    e.preventDefault();
    if (name.length < 6 || pass.length < 6 || email.includes("@") !== true) {
      toast.info("Please enter valid data");
      return;
    }
    try {
      const res = await toast.promise(
        axios.post("https://archanum.onrender.com/signup", {
          username: name,
          email: email,
          password: pass,
        }),
        {
          pending: "Signing up...",
          success: "Signup successful!",
          error: "An error occurred during signup.",
        }
      );

      if (res.status == 201) {
        router.push("/login");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex flex-col items-center  bg-black justify-center h-screen">
      <div>
        <FaSmile className="w-8 my-2 text-white h-8" />
      </div>

      <h1 className="text-4xl text-white font-bold mb-8">Register</h1>

      <form className="w-96">
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block text-white text-sm font-bold mb-2"
          >
            Username (min 6 characters)
          </label>
          <input
            type="text"
            value={name}
            required
            id="name"
            onChange={(e) => setname(e.target.value)}
            placeholder="Enter your name"
            className="border rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-300"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="email"
            className="block text-white text-sm font-bold mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            required
            value={email}
            onChange={(e) => setemail(e.target.value)}
            placeholder="Enter your email"
            className="border rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-300"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-white text-sm font-bold mb-2"
          >
            Password (min 6 characters)
          </label>
          <input
            type="password"
            id="password"
            required
            value={pass}
            onChange={(e) => setpass(e.target.value)}
            placeholder="Enter your password"
            className="border rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-300"
          />
        </div>

        <div className="flex gap-3 justify-center items-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={(e) => handlesignup(e)}
          >
            Sign Up
          </button>
          <Link
            className="text-blue-500 hover:text-blue-700 font-bold"
            href="login"
          >
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
