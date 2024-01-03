"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Scroll = ({ data }) => {
  const router = useRouter();
  return (
    <div className="flex overflow-x-scroll w-full scrollbar-hide  gap-3">
      {data.map((x) => (
        <div
          key={x.edition}
          onClick={() => {
            localStorage.setItem("lastClicked", JSON.stringify(x));
            router.push("/nft/" + x.edition);
          }}
          className="flex-none rounded-lg w-50 h-50 bg-zinc-700 "
        >
          <img
            className="  rounded-lg w-52 h-52 hover:cursor-pointer "
            src={x.image}
            alt={x.name}
          />
          <p className="text-white mt-1 text-center">{x.name}</p>
        </div>
      ))}
    </div>
  );
};

export default Scroll;
