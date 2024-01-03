"use client";
import { useState } from "react";
import { useWeb3Modal } from "@web3modal/react";
import { useAccount, useDisconnect } from "wagmi";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Mobile from "./Mobile";
import { getNetwork } from "wagmi/actions";
import Modal from "react-modal";
import Solana from "./Solana";
import Wallets from "./Wallets";
import { useWallet } from "@solana/wallet-adapter-react";
import Eth from "@/icons/Eth";
import Bsc from "@/icons/Bsc";
import Matic from "@/icons/Matic";
import Sol from "@/icons/Sol";
import Sui from "@/icons/Sui";
import { useWalletKit } from "@mysten/wallet-kit";
import Suiw from "./Sui";
import Image from "next/image";
import Logo from "@/assets/Logo.png";
import { FaWallet } from "react-icons/fa";
import { MdError } from "react-icons/md";
import walletStore from "@/walletStore";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    background: "linear-gradient(to right, #9f7aea, #7f22fd)",
    color: "white",
    borderRadius: "12px",
  },
};

const Header = () => {
  const { open } = useWeb3Modal();
  const { isConnected } = useAccount();
  const Disconnect = useDisconnect().disconnect;
  const router = usePathname();
  const { chain } = getNetwork();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [sol, setSol] = useState(false);
  const { connected, disconnect } = useWallet();
  const SUI = useWalletKit().isConnected;
  const suidisc = useWalletKit().disconnect;
  const [sui, setSui] = useState(false);
  const network = walletStore((state) => state.network);
  const setNetworkEth = walletStore((state) => state.setNetworkEth);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    setSol(false);
    setSui(false);
  }

  const handleConnect = () => {
    open();
    setIsOpen(false);
    if (isConnected) {
      setNetworkEth();
    }
  };

  const handleSol = () => {
    setSol(true);
    setIsOpen(false);
  };

  const handleSui = () => {
    setSui(true);
    setIsOpen(false);
  };

  const directDisconnect = () => {
    if (isConnected) {
      Disconnect();
    } else if (connected) {
      disconnect();
    } else if (SUI) {
      suidisc();
    }
  };

  return (
    <div className="flex  items-center  border-gray-500 justify-between bg-black p-3 sticky top-0 ">
      <Mobile showDropdown={showDropdown} setShowDropdown={setShowDropdown} />
      <div className="hidden md:flex gap-6 items-center">
        <div className="flex gap-2 items-center">
          <Image
            className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
            width={35}
            height={35}
            src={Logo}
          />
          <Link
            href="/"
            className={`text-3xl font-semibold transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 hover:text-green-500 ${
              router === "/" ? "text-green-500" : "text-white"
            }`}
          >
            ARCHANUM
          </Link>
        </div>
        <div className="flex gap-4  items-center">
          <Link
            href="/buy"
            className={`text-xl transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:text-green-500 duration-300  ${
              router === "/buy" ? " text-green-500" : "text-white"
            }`}
          >
            BUY
          </Link>
          <Link
            href="/sell"
            className={`text-xl transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:text-green-500 duration-300  ${
              router === "/sell" ? " text-green-500" : "text-white"
            }`}
          >
            SELL
          </Link>
          <Link
            href="/mint"
            className={`text-xl transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:text-green-500 duration-300 ${
              router === "/mint" ? " text-green-500" : "text-white"
            }`}
          >
            MINT
          </Link>
        </div>
      </div>

      <div className="flex gap-2  items-center">
        <div className="  flex w-full items-center  ">
          <input
            type="text"
            className="bg-gray-50 hidden md:block border w-full  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1.5 "
            placeholder="🔎 Search an item ..."
            required
          />
          <input
            type="text"
            className="bg-gray-50 md:hidden border w-full  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1.5 "
            placeholder="  🔎   "
            required
          />
        </div>
        {isConnected && chain.id === 1 && (
          <div className="flex flex-col hover:bg-slate-500  bg-blue-500 p-1 rounded-full">
            <Eth handleConnect={handleConnect} />
          </div>
        )}
        {isConnected && chain.id === 56 && (
          <div className="flex flex-col hover:bg-slate-500  bg-blue-500 p-1 rounded-full">
            <Bsc handleConnect={handleConnect} />
          </div>
        )}
        {isConnected && chain.id === 137 && (
          <div className="flex flex-col hover:bg-slate-500  bg-blue-500 p-1 rounded-full">
            <Matic handleConnect={handleConnect} />
          </div>
        )}
        {isConnected &&
          chain.id !== 137 &&
          chain.id !== 1 &&
          chain.id !== 56 && (
            <button onClick={handleConnect}>
              <MdError className="w-6 h-6 rounded-full hover:text-red-700 bg-white text-red-500" />
            </button>
          )}

        {connected && (
          <div className="flex flex-col hover:bg-slate-500  bg-blue-500 p-1 rounded-full">
            <Sol handleSol={handleSol} />
          </div>
        )}
        {SUI && (
          <div className="flex flex-col hover:bg-slate-500  bg-blue-500 p-1 rounded-full">
            <Sui handleSui={handleSui} />
          </div>
        )}
        {!isConnected && !connected && !SUI && (
          <button
            onClick={openModal}
            className="text-white font-bold px-2 py-1 rounded-lg  
           bg-green-600 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 hover:bg-green-900"
          >
            connect
          </button>
        )}
        {(isConnected || connected || SUI) && (
          <button
            onClick={directDisconnect}
            className="text-white p-2 rounded-full  
         bg-red-500 hover:bg-red-700"
          >
            <FaWallet className="w-5 h-5" />
          </button>
        )}

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
          ariaHideApp={false}
        >
          <Wallets
            handleConnect={handleConnect}
            handleSol={handleSol}
            handleSui={handleSui}
          />
        </Modal>
        <Modal
          isOpen={sol}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
          ariaHideApp={false}
        >
          <Solana setSol={setSol} />
        </Modal>
        <Modal
          isOpen={sui}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
          ariaHideApp={false}
        >
          <Suiw setSui={setSui} />
        </Modal>
      </div>
    </div>
  );
};

export default Header;
