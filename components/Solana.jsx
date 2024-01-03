"use client";
import { useWallet } from "@solana/wallet-adapter-react";

const Solana = ({ setSol }) => {
  const { select, wallets, publicKey, disconnect } = useWallet();
  console.log(publicKey);

  return (
    <div className="flex  flex-col gap-3">
      <h1 className="text-center text-xl">SOLANA WALLETS</h1>
      {wallets.filter((wallet) => wallet.readyState === "Installed").length >
      0 ? (
        wallets
          .filter((wallet) => wallet.readyState === "Installed")
          .map((wallet) => (
            <button
              key={wallet.adapter.name}
              onClick={() => {
                select(wallet.adapter.name);
                setSol(false);
              }}
              className=" p-2 bg-black hover:bg-blue-500  font-bold rounded-lg text-sm"
            >
              <img
                src={wallet.adapter.icon}
                alt={wallet.adapter.name}
                className="w-6 h-6 mb-2 block mx-auto"
              />
              {wallet.adapter.name}
            </button>
          ))
      ) : (
        <div className="text-xl font-bold">
          No wallet found. Please download a supported Solana wallet
        </div>
      )}
      {publicKey && (
        <button
          onClick={() => {
            disconnect();
            setSol(false);
          }}
          className="bg-red-500 mt-2 rounded-lg p-2  hover:bg-red-700"
        >
          Disconnect
        </button>
      )}
    </div>
  );
};

export default Solana;
