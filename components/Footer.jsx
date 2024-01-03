import { AiFillTwitterCircle, AiFillGithub } from "react-icons/ai";
const Footer = () => {
  return (
    <div className="bg-black py-2 border-gray-500 text-center">
      <div className="flex justify-center items-center gap-2">
        <AiFillTwitterCircle className="w-8 h-8 text-white" />
        <AiFillGithub className="w-8 h-8 text-white" />
      </div>
      <p className="text-white my-2">
        made with 💚 from <strong>NUCLEUS</strong>{" "}
      </p>
    </div>
  );
};

export default Footer;
