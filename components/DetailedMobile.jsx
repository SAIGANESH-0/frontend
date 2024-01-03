"use client";
import Image from "next/image";

const DetailedMobile = ({ dragon, lastClicked }) => {
  return (
    <div className="flex flex-col md:hidden items-center justify-around w-full bg-black gap-4 p-4 min-h-screen">
      <div className="w-full bg-gray-700 rounded-3xl flex justify-center items-center">
        <img className="rounded-3xl" src={dragon}></img>
      </div>
      <button className="bg-blue-500 p-2 rounded-lg hover:bg-blue-700 text-white">
        check NFT
      </button>
      <div className="bg-gray-700 flex  flex-col shadow-xl rounded-3xl w-full p-4">
        <h2 className="text-2xl text-white text-center font-bold mb-2">
          NFT Details
        </h2>
        <p className="text-green-400 text-xl  mb-2">{lastClicked.name}</p>
        <p className="text-white mb-2">{lastClicked.description}</p>
        <p className="text-white mb-2">ID: {lastClicked.edition}</p>
        <p className="text-white mb-2">Price: 2.5 ETH</p>
      </div>
      <div className="bg-gray-700 shadow-xl w-full rounded-3xl p-4">
        <h2 className="text-2xl text-white font-bold text-center mb-2">
          NFT Traits
        </h2>
        <p className="text-white mb-2">Trait 1</p>
        <p className="text-white mb-2">Trait 2</p>
        <p className="text-white mb-2">Trait 3</p>
      </div>
      <div className="bg-gray-700 shadow-xl w-full rounded-3xl p-4">
        <h2 className="text-2xl text-white text-center font-bold mb-2">
          Trading Activity
        </h2>
        <p className="text-white mb-2">Activity 1</p>
        <p className="text-white mb-2">Activity 2</p>
        <p className="text-white mb-2">Activity 3</p>
      </div>
    </div>
  );
};

export default DetailedMobile;
