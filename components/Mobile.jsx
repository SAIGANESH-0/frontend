"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Modal from "react-modal";
import { GiCancel } from "react-icons/gi";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    background: "black",
    color: "white",
    borderRadius: "18px",
    width: "100%",
    height: "100%",
  },
};
const Mobile = ({ showDropdown, setShowDropdown }) => {
  const router = usePathname();
  return (
    <div className="md:hidden flex gap-2 w-full">
      <button
        onClick={() => setShowDropdown(true)}
        className="focus:outline-slate-200"
      >
        <svg
          className="h-8 w-8 mb-2 fill-current"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M19 8h-14v2h14v-2zm0 5h-14v2h14v-2zm0 5h-14v2h14v-2"
            className="text-white  fill-current"
          />
        </svg>
      </button>
      <Link
        href="/"
        onClick={(e) => {
          setShowDropdown(false);
          e.stopPropagation();
        }}
        className={`text-2xl hover:text-green-500 mt-1 ${
          router === "/" ? " text-green-500" : "text-white"
        }`}
      >
        ARCHANUM
      </Link>
      <Modal
        isOpen={showDropdown}
        onRequestClose={() => setShowDropdown(false)}
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <div
          onClick={() => setShowDropdown(false)}
          className="flex flex-col w-full h-screen bg-black items-center justify-center gap-3"
        >
          <h1 className="text-5xl text-yellow-200 mb-3">navigate to</h1>
          <Link
            href="/"
            onClick={(e) => {
              setShowDropdown(false);
            }}
            className={`text-3xl ${
              router === "/" ? " text-green-500" : "text-white"
            }`}
          >
            HOMEPAGE
          </Link>
          <Link
            href="/buy"
            className={` text-3xl  ${
              router === "/buy" ? " text-green-500" : "text-white"
            }`}
          >
            BUY NFT
          </Link>
          <Link
            href="/sell"
            className={` text-3xl  ${
              router === "/sell" ? " text-green-500" : "text-white"
            }`}
          >
            SELL NFT
          </Link>
          <Link
            href="/mint"
            className={` text-3xl   ${
              router === "/mint" ? " text-green-500" : "text-white"
            }`}
          >
            MINT NFT
          </Link>
          <button onClick={() => setShowDropdown(false)}>
            <GiCancel className="w-8 h-8  bg-red-500 rounded-full mt-2" />
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Mobile;
