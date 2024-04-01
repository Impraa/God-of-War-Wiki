import { NextPage } from "next";

interface Props {
  children: React.ReactNode;
  isError?: boolean;
}

const Message: NextPage<Props> = ({ children, isError = false }) => {
  return (
    <div
      className={
        (isError ? "bg-primary text-white " : "bg-lime-500 text-black ") +
        " w-[90vw] flex justify-center items-center h-[5rem] mt-5 px-2 font-bold font-fira-mono lg:w-[40rem] animate-appear"
      }
    >
      {children}
    </div>
  );
};

export default Message;
