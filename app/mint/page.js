"use client";

import { getNetwork } from "wagmi/actions";
import { useAccount } from "wagmi";
// import { useWallet } from "@solana/wallet-adapter-react";
// import { useWalletKit } from "@mysten/wallet-kit";
import { ethContract, maticContract, bscContract } from "@/address/sol";
import abi from "@/abi/sol.json";
import { ethers } from "ethers";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const Mint = () => {
  const { chain } = getNetwork();
  const account = useAccount();
  useEffect(() => {
    document.title = "Mint a NFT";
  });

  // const { publicKey } = useWallet();
  // const { currentAccount } = useWalletKit();
  let provider;
  let contract;
  if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    provider = new ethers.BrowserProvider(window.ethereum);
    let sel;
    if (chain) {
      if (chain.id === 97) {
        sel = bscContract;
      } else if (chain.id === 80001) {
        sel = maticContract;
      } else if (chain.id === 11155111) {
        sel = ethContract;
      }
      contract = new ethers.Contract(sel, abi.abi, provider);
    }
  }
  const [img, setimg] = useState("");

  async function handleMint() {
    try {
      toast("Minting your nft ...");
      let count = await contract.tokenCounter();
      count = Number(count);
      let tokenURI = `https://chocolate-unacceptable-horse-432.mypinata.cloud/ipfs/QmYu3nDob2g9GN6uBgot9qKiQo7WFmjFX21jhVpoDc5PU5/${
        count + 1
      }.json`;
      let image = `https://chocolate-unacceptable-horse-432.mypinata.cloud/ipfs/QmSb8uqquSn9AEpM6aXBSKiMUKmoeHBYDLNriUTZ8iFGbB/${
        count + 1
      }.png`;

      const minterAddress = account.address;
      const signer = await provider.getSigner();
      let sel;
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

      const tx = await contract.mint(tokenURI, minterAddress, 1);
      await tx.wait();
      console.log(`Minted ${tokenURI} NFT successfully`);
      setimg(image);
    } catch (e) {
      console.log("error");
      toast("error occured...");
    }
  }

  return (
    <div className="min-h-screen p-3 items-center justify-center flex flex-col gap-4 bg-black text-white">
      <img
        className="h-60 w-60 rounded-3xl"
        src="https://scontent.fmaa9-1.fna.fbcdn.net/v/t1.6435-9/146087752_110414087712005_6671439110131033693_n.png?_nc_cat=107&cb=99be929b-3346023f&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=rjrBQK2--DoAX8B6u8O&_nc_ht=scontent.fmaa9-1.fna&oh=00_AfCQBIMLf_ZZ-aqkIXydoCf-f9UM8d_XkxTjtK4Yk9mM6Q&oe=64E851B6"
      />
      <button className="bg-blue-500 p-2 rounded-xl" onClick={handleMint}>
        Mint the nft
      </button>
      {img && (
        <>
          <h1>Minted the NFT successfully</h1>
          <img loading="eager" className="rounded-2xl" src={img} />
        </>
      )}
    </div>
  );
};

export default Mint;
