"use client";
import { ethContract, maticContract, bscContract } from "@/address/sol";
import abi from "@/abi/sol.json";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { getNetwork } from "wagmi/actions";
import Card from "@/components/Card";
import NFTs from "@/NFTmetadata.js";

const Buy = () => {
  let provider;
  let contract;
  let sel;
  let signer;
  const { chain } = getNetwork();
  const [open, setopen] = useState(false);
  const [eth, seteth] = useState(0.1);
  const [time, settime] = useState(3600);
  const [id, setid] = useState(1);
  const [ims, setims] = useState([]);
  const account = useAccount();
  const trade = "buy";
  const [loading, setloading] = useState(false);
  const [wait, setwait] = useState(false);

  useEffect(() => {
    async function dataload() {
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
            if (owner !== account.address) {
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
    document.title = "Buy NFTs";
  }, []);

  async function handlebuy() {
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
      const tx = await contract.makeOffer(id, time, {
        value: ethers.parseEther(eth.toString()),
      });
      await tx.wait();
      console.log("offered man");
      setwait(false);
      setopen(false);
    } catch (error) {
      setwait(false);
    }
  }

  return (
    <div className="min-h-screen w-full items-center justify-center flex flex-col gap-3 p-3 bg-black text-white">
      <h1>Other's NFTs</h1>
      {!open && (
        <Card
          setopen={setopen}
          setid={setid}
          ims={ims}
          trade={trade}
          loading={loading}
        />
      )}
      {open && (
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col">
            <label
              htmlFor="number1"
              className="mb-2 text-sm font-bold text-white"
            >
              Enter the offer amount in ether
            </label>
            <input
              type="number"
              id="number1"
              value={eth}
              onChange={(e) => seteth(e.target.value)}
              name="number1"
              className="px-3 py-2 text-sm border-2 rounded-md text-gray-900 border-gray-300 focus:outline-none"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="number2"
              className="mb-2 text-sm font-bold text-white"
            >
              Enter offer time in seconds
            </label>
            <input
              type="number"
              id="number2"
              name="number2"
              onChange={(e) => settime(e.target.value)}
              value={time}
              className="px-3 py-2 text-sm border-2 rounded-md text-gray-900 border-gray-300 focus:outline-none"
            />
          </div>

          <button
            onClick={handlebuy}
            className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Make Offer
          </button>
          {wait && <h1>please wait .....</h1>}
        </div>
      )}
    </div>
  );
};

export default Buy;
