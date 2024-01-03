"use client";
import { ethContract, maticContract, bscContract } from "@/address/sol";
import abi from "@/abi/sol.json";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { getNetwork } from "wagmi/actions";
import Card from "@/components/Card";
import NFTs from "@/NFTmetadata.js";
import { useRouter } from "next/navigation";

const Sell = () => {
  const router = useRouter();

  let provider;
  let contract;
  let sel;
  let signer;
  const { chain } = getNetwork();
  const [ims, setims] = useState([]);
  const [loading, setloading] = useState(false);
  const account = useAccount();
  const [eth, seteth] = useState(1);
  const [time, settime] = useState("");
  const [wait, setwait] = useState(false);
  const [price, setprice] = useState("");

  useEffect(() => {
    async function dataload() {
      document.title = "Sell your NFTs";
      try {
        if (
          typeof window !== "undefined" &&
          typeof window.ethereum !== "undefined"
        ) {
          provider = new ethers.BrowserProvider(window.ethereum);
          signer = await provider.getSigner();
          if (chain) {
            if (chain.id === 97) {
              sel = bscContract;
            } else if (chain.id === 80001) {
              sel = maticContract;
            } else if (chain.id === 11155111) {
              sel = ethContract;
            }
            contract = new ethers.Contract(sel, abi.abi, signer);
          }
        }
        if (contract) {
          setloading(true);
          let count = await contract.tokenCounter();
          count = Number(count);
          let nftdata = [];
          for (let i = 1; i <= count; i++) {
            let owner = await contract.ownerOf(i);
            if (owner === account.address) {
              let data = NFTs[i - 1];
              nftdata.push(data);
            }
          }
          setims(nftdata);
          setloading(false);
        } else {
          return;
        }
      } catch (error) {
        console.log(error);
        setloading(false);
      }
    }
    dataload();
  }, []);

  async function handlesell(x) {
    try {
      setwait(true);
      provider = new ethers.BrowserProvider(window.ethereum);
      signer = await provider.getSigner();
      if (chain) {
        if (chain.id === 97) {
          sel = bscContract;
        } else if (chain.id === 80001) {
          sel = maticContract;
        } else if (chain.id === 11155111) {
          sel = ethContract;
        }
        contract = new ethers.Contract(sel, abi.abi, signer);
      }
      if (x === "a") {
        const tx = await contract.offers(eth, time);

        setprice(Number(tx[0]) / 1000000000000000000);
        setwait(false);
      } else {
        const tx = await contract.acceptOffer(eth, time);
        await tx.wait();
        router.push("/buy");
        setwait(false);
      }
    } catch (error) {
      setwait(false);
    }
  }

  return (
    <div className="min-h-screen w-full items-center justify-center flex flex-col gap-3 p-3 bg-black text-white">
      <h1 className="text-xl">Fetch offer data</h1>
      <label htmlFor="number1" className="mb-2 text-sm font-bold text-white">
        Enter the edition number
      </label>
      <input
        type="number"
        id="number1"
        value={eth}
        onChange={(e) => seteth(e.target.value)}
        name="number1"
        className="px-3 py-2 text-sm border-2 rounded-md text-gray-900 border-gray-300 focus:outline-none"
      />
      <label htmlFor="number2" className="mb-2 text-sm font-bold text-white">
        Enter the address of offerer
      </label>
      <input
        type="text"
        id="number2"
        name="number2"
        onChange={(e) => settime(e.target.value)}
        value={time}
        className="px-3 py-2 text-sm border-2 rounded-md text-gray-900 border-gray-300 focus:outline-none"
      />
      {price && <h1>offered price is {price} eth</h1>}
      <button
        onClick={() => handlesell("a")}
        className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
      >
        Check offer
      </button>
      <button
        onClick={() => handlesell("b")}
        className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
      >
        Accept offer
      </button>
      {wait && <h1>please wait .....</h1>}
      <h1 className="text-xl">Your own NFTs</h1>
      <Card ims={ims} loading={loading} />
    </div>
  );
};

export default Sell;
