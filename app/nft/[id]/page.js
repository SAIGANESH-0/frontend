"use client";
import Image from "next/image";
import DetailedMobile from "@/components/DetailedMobile";
import { useEffect } from "react";

const Nft = () => {
  let lastClicked = localStorage.getItem("lastClicked");
  lastClicked = JSON.parse(lastClicked);
  useEffect(() => {
    document.title = "Details of NFT";
  });

  return (
    <>
      <DetailedMobile lastClicked={lastClicked} dragon={lastClicked.image} />

      <div className=" md:flex flex-col hidden gap-5  w-full min-h-screen bg-black  justify-evenly items-center p-5">
        <div className="flex w-full gap-3">
          <div className="w-1/2 bg-gray-700 rounded-3xl flex justify-center items-center">
            <img className="rounded-3xl" src={lastClicked.image}></img>
          </div>
          <div className="bg-gray-700 flex justify-around items-center flex-col shadow-xl rounded-3xl w-1/2 p-4">
            <h2 className="text-2xl text-white text-center font-bold mb-2">
              NFT Details
            </h2>
            <div>
              <p className="text-green-400 text-xl  mb-2">{lastClicked.name}</p>
              <p className="text-white mb-2">{lastClicked.description}</p>
              <p className="text-white mb-2">ID: {lastClicked.edition}</p>
              <p className="text-white mb-2">Price: 2.5 ETH</p>
            </div>
            <div>
              <button className="bg-blue-500 p-2 rounded-lg hover:bg-blue-700 text-white">
                check NFT
              </button>
            </div>
          </div>
        </div>
        <div className="flex w-full gap-3">
          <div className="bg-gray-700 shadow-xl w-1/2 rounded-3xl p-4">
            <h2 className="text-2xl text-white font-bold text-center mb-2">
              NFT Traits
            </h2>
            <p className="text-white mb-2">hdhdhhdhhdhd</p>
            <p className="text-white mb-2">fhfhhfffjffffn</p>
            <p className="text-white mb-2">hfdjfdjfdjfjd</p>
          </div>
          <div className="bg-gray-700 shadow-xl w-1/2 rounded-3xl p-4">
            <h2 className="text-2xl text-white text-center font-bold mb-2">
              Trading Activity
            </h2>
            <p className="text-white mb-2">Activity 1</p>
            <p className="text-white mb-2">Activity 2</p>
            <p className="text-white mb-2">Activity 3</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Nft;
