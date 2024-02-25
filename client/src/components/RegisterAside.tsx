import { NextPage } from "next";
import Image from "next/image";

interface Props {}

const RegisterAside: NextPage<Props> = ({}) => {
  return (
    <div className="hidden md:flex md:flex-col md:items-center xl:max-w-[949px] xl:pt-5 xl:mr-10">
      <h2 className="text-white font-josefin-sans text-3xl xl:text-[2.75rem]">
        Welcome to the God of War Wiki!{" "}
      </h2>
      <p className="text-white font-fira-mono px-10 py-10">
        Join our community of passionate gamers and share your knowledge about
        the epic God of War series. Register now to unlock exclusive content,
        participate in discussions, and connect with other fans. Let&apos;s
        explore the world of Kratos and Atreus together!
      </p>
      <Image
        width={2659}
        height={1558}
        quality={100}
        className="h-80 w-[35rem] md:h-[25rem] md:w-[60rem] lg:w-[40rem] xl:h-[30rem] xl:w-[50rem]"
        src={"/Register.png"}
        alt="Register image Kratos with Athreus"
      />
    </div>
  );
};

export default RegisterAside;
