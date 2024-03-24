import Google from "@/assets/Google";
import { NextPage } from "next";

interface Props {
  children: React.ReactNode;
  type: "button" | "submit";
  colorType: "primary" | "secondary" | "google";
  onClick?: () => void;
  disable?: boolean;
}

const BetterButton: NextPage<Props> = ({
  children,
  type,
  colorType,
  onClick,
  disable = false,
}) => {
  return (
    <button
      className={
        colorType === "google"
          ? `transition-all text-black bg-white font-medium hover:scale-105 py-2 w-80 text-xl rounded-full mt-5 flex items-center justify-center space-x-3 font-fira-mono 
          ${disable ? " bg-gray-400 cursor-wait" : ""}`
          : colorType === "primary"
          ? `transition-all text-white font-medium bg-primary hover:bg-primary-2 py-2 px-5 text-xl rounded-full mt-5 font-fira-mono `
          : `transition-all text-white font-medium bg-secondary hover:bg-secondary-2 py-2 px-5 text-xl rounded-full mt-5 font-fira-mono `
      }
      type={type}
      onClick={onClick}
      disabled={disable}
    >
      {colorType === "google" ? (
        <span
          className={`mr-5 bg-gray-50 rounded-full ${
            disable ? " bg-gray-400 cursor-wait" : ""
          }`}
        >
          <Google />
        </span>
      ) : (
        ""
      )}
      {children}
    </button>
  );
};

export default BetterButton;
