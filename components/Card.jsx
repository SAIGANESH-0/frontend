"use client";

import { useRouter } from "next/navigation";
import Loading from "./Loading";

const Card = ({ ims, trade, setopen, setid, loading }) => {
  const router = useRouter();
  return (
    <div className=" bg-black text-white flex flex-col gap-3  ">
      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-wrap justify-center">
          {ims.length ? (
            ims.map((item) => (
              <div
                key={item.edition}
                onClick={() => {
                  router.push("/nft/" + item.edition);
                  localStorage.setItem("lastClicked", JSON.stringify(item));
                  console.log(item);
                }}
                className="max-w-sm rounded-lg overflow-hidden  bg-zinc-700 shadow-lg m-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className=" rounded-lg hover:cursor-pointer w-full"
                />
                <div className="px-6 flex flex-col justify-center align-middle py-4">
                  <h1 className="font-bold text-xl text-white text-center mb-1">
                    {item.name}
                  </h1>
                  <p className=" text-center text-white text-base">
                    {item.description}
                  </p>
                  <button
                    onClick={(e) => {
                      if (trade === "buy") {
                        e.stopPropagation();
                        setid(item.edition);
                        setopen(true);
                      }
                    }}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-2 rounded"
                  >
                    {trade === "buy" ? "Make an Offer" : "check nft"}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <h1 className="text-white">No data found</h1>
          )}
        </div>
      )}
    </div>
  );
};

export default Card;
