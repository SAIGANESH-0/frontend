"use client";

import Link from "next/link";
import dragon from "@/assets/dragon.png";
import Image from "next/image";
import NFTs from "@/NFTmetadata";
import Scroll from "./Scroll";
import Types from "@/components/Types";
import { useState } from "react";

const Main = () => {
  let loggedin = "false";
  if (
    typeof sessionStorage !== "undefined" &&
    typeof sessionStorage.getItem("loggedIn") !== "undefined"
  ) {
    loggedin = sessionStorage.getItem("loggedIn");
  }

  const [logged, setlogged] = useState(loggedin);

  return (
    <div className=" min-h-screen flex w-full flex-col justify-start bg-black  items-center gap-5  px-5 py-2 ">
      {logged === "true" ? (
        <div className="flex justify-center">
          <button
            onClick={() => {
              sessionStorage.setItem("loggedIn", "false");
              setlogged("false");
            }}
            className="text-white bg-red-500 p-2 rounded-lg  hover:bg-red-700 font-bold"
          >
            Log out
          </button>
        </div>
      ) : (
        <div className="flex gap-3">
          <Link
            className="text-white bg-blue-500 p-1.5 rounded-lg  hover:bg-blue-700 font-bold"
            href="login"
          >
            Log in
          </Link>
          <Link
            className="text-white bg-green-600 p-1.5 rounded-lg  hover:bg-green-800 font-bold"
            href="signup"
          >
            Sign up
          </Link>
        </div>
      )}
      <h1 className="text-2xl text-center text-green-500  font-semibold  md:text-3xl">
        Archanum Marketplace
      </h1>

      <div className="md:flex gap-2 hidden mt-2  w-full ">
        <div className="w-1/2 flex  items-center ">
          <Image className="rounded-3xl" src={dragon}></Image>
        </div>
        <div className="w-1/2 ">
          <Types />
        </div>
      </div>

      <Image className="md:hidden" src={dragon}></Image>
      <div className="md:hidden w-full">
        <Types />
      </div>

      <h1 className="text-2xl text-white w-full text-left">Recently Added</h1>
      <Scroll data={NFTs} />
      <h1 className="text-2xl w-full text-white text-left">Most Popular</h1>
      <Scroll data={NFTs} />
      <h1 className="text-2xl w-full text-white text-left">Top Selling</h1>
      <Scroll data={NFTs} />
    </div>
  );
};

export default Main;
