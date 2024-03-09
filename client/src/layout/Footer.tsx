import { NextPage } from "next";
import Logo from "@/assets/Logo";
import NavItems from "@/components/NavItems";

interface Props {}

const Footer: NextPage<Props> = ({}) => {
  return (
    <div className="bg-[#241d1d] text-primary-text w-full py-5 mt-5 flex space-x-4 justify-center items-center flex-col space-y-4 md:flex-row md:space-y-0 z-10">
      <div className="flex">
        <Logo className="mx-5" />
        <div className="flex flex-col items-center">
          <p className="text-xl">God of war wiki</p>
          <p className="text-xs">Powered by Impraa</p>
        </div>
      </div>
      <NavItems link={"/"} text={"Home"} />
      <NavItems link={"/search"} text={"Search"} />
    </div>
  );
};

export default Footer;
