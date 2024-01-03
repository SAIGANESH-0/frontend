"use client";
import Matic from "@/icons/Matic";
import Bsc from "@/icons/Bsc";
import Eth from "@/icons/Eth";
import Sol from "@/icons/Sol";
import Sui from "@/icons/Sui";

const Wallets = ({ handleConnect, handleSol, handleSui }) => {
  return (
    <div className="flex flex-col items-center mb-2 gap-4">
      <h1 className="text-xl">Select any network to proceed</h1>
      <div className="flex justify-center gap-4  items-center">
        <div className="flex flex-col hover:bg-slate-500  bg-slate-950 p-3 rounded-lg text-white justify-center items-center">
          <Eth handleConnect={handleConnect} />
        </div>
        <div className="flex flex-col hover:bg-slate-500 bg-slate-950 p-3 rounded-lg text-white justify-center items-center">
          <Matic handleConnect={handleConnect} />
        </div>
        <div className="flex flex-col hover:bg-slate-500 bg-slate-950 p-3 rounded-lg text-white justify-center items-center">
          <Bsc handleConnect={handleConnect} />
        </div>
        <div className="flex flex-col hover:bg-slate-500 bg-slate-950 p-3 rounded-lg text-white justify-center items-center">
          <Sol handleSol={handleSol} />
        </div>
        <div className="flex flex-col hover:bg-slate-500  bg-slate-950 p-3 rounded-lg text-white justify-center items-center">
          <Sui handleSui={handleSui} />
        </div>
      </div>
    </div>
  );
};

export default Wallets;
