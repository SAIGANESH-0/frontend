"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
const Types = () => {
  const router = useRouter();
  const initialData = [
    {
      id: 1,
      title: "Item 1",
      rarity: "Base",
      price: "$10",
      chain: "Chain 1",
    },
    {
      id: 2,
      title: "Item 2",
      rarity: "Base",
      price: "$20",
      chain: "Chain 2",
    },
    { id: 3, title: "Item 3", rarity: "Rare", price: "$30", chain: "Chain 3" },
    { id: 4, title: "Item 4", rarity: "Epic", price: "$40", chain: "Chain 4" },
    {
      id: 5,
      title: "Item 5",
      rarity: "Legendary",
      price: "$50",
      chain: "Chain 5",
    },
    {
      id: 6,
      title: "Item 1",
      rarity: "Base",
      price: "$10",
      chain: "Chain 1",
    },
    {
      id: 7,
      rarity: "Base",
      title: "Item 2",
      price: "$20",
      chain: "Chain 2",
    },
    { id: 8, title: "Item 3", rarity: "Rare", price: "$30", chain: "Chain 3" },
    { id: 9, title: "Item 4", rarity: "Epic", price: "$40", chain: "Chain 4" },
    {
      id: 10,
      title: "Item 5",
      rarity: "Legendary",
      price: "$50",
      chain: "Chain 5",
    },
    { id: 11, title: "Item 3", rarity: "Rare", price: "$30", chain: "Chain 3" },
    { id: 12, title: "Item 4", rarity: "Epic", price: "$40", chain: "Chain 4" },
    {
      id: 13,
      title: "Item 5",
      rarity: "Legendary",
      price: "$50",
      chain: "Chain 5",
    },
  ];
  const [filter, setFilter] = useState("");
  function filterData() {
    if (filter === "") {
      return initialData;
    } else {
      return initialData.filter((item) => item.rarity === filter);
    }
  }

  return (
    <div className=" flex w-full flex-col items-center justify-center  gap-5">
      <h1 className="text-white text-center text-xl">
        Trending & Popular NFTs{" "}
      </h1>
      <table className="table-auto bg-slate-700 text-white text-center w-full ">
        <thead>
          <tr className="bg-lime-700">
            <th className="border-r-2 border-b-2">Title</th>
            <th className="border-r-2 border-b-2">Rarity</th>
            <th className="border-r-2 border-b-2">ID</th>
            <th className="border-r-2 border-b-2">Price</th>
            <th className=" border-b-2">Chain</th>
          </tr>
        </thead>
        <tbody>
          {filterData().map((item) => (
            <tr
              className="border-b-2 hover:bg-black hover:cursor-pointer "
              key={item.id}
              onClick={() => {
                router.push("/nft/1");
              }}
            >
              <td className="border-r-2">{item.title}</td>
              <td className="border-r-2">{item.rarity}</td>
              <td className="border-r-2">{item.id}</td>
              <td className="border-r-2">{item.price}</td>
              <td>{item.chain}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Types;
