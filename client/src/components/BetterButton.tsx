import { NextPage } from "next";

interface Props {
  children: React.ReactNode;
  type: "button" | "submit";
  colorType: "primary" | "secondary";
}

const BetterButton: NextPage<Props> = ({ children, type, colorType }) => {
  return (
    <button
      className={`transition-all text-${colorType}-text bg-${colorType}-2 hover:bg-${colorType} py-2 px-5 text-2xl rounded-full mt-5`}
      type={type}
    >
      {children}
    </button>
  );
};

export default BetterButton;
