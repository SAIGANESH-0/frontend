"use client";
import Main from "@/components/Main";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    document.title = "Archanum Homepage";
    alert("Switch to evm testnets to use app");
  });

  return (
    <>
      <Main />
    </>
  );
};

export default Home;
