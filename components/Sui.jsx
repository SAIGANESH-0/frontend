"use client";
import { useWalletKit } from "@mysten/wallet-kit";

const Suiw = ({ setSui }) => {
  const {
    currentAccount,
    currentWallet,
    connect,
    wallets,
    disconnect,
    isConnected,
  } = useWalletKit();

  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-center text-xl">SUI WALLETS</h1>
      {wallets.length > 0 ? (
        wallets.map((wallet) => (
          <button
            key={wallet.name}
            onClick={() => {
              connect(wallet.name);
              setSui(false);
            }}
            className=" p-2 bg-black hover:bg-blue-500 text-white font-bold rounded-lg text-sm"
          >
            <img
              src={wallet.icon}
              alt={wallet.name}
              className="w-6 h-6 mb-2 block mx-auto"
            />
            {wallet.name}
          </button>
        ))
      ) : (
        <div className="text-xl font-bold">
          No wallet found. Please download a supported Sui wallet
        </div>
      )}
      {isConnected && (
        <button
          onClick={() => {
            disconnect();
            setSui(false);
          }}
          className="bg-red-500 mt-2 rounded p-2 text-white hover:bg-red-700"
        >
          Disconnect
        </button>
      )}
    </div>
  );
};

export default Suiw;
