import { NextPage } from "next";

interface Props {}

const Header: NextPage<Props> = ({}) => {
  return (
    <div className="flex flex-col items-center space-y-5">
      <h1 className="text-primary text-2xl border-b-2 border-primary pb-6 font-josefin-sans md:text-3xl lg:text-4xl lg:mt-10 xl:text-4xl xl:px-10">
        Welcome to God of war wiki
      </h1>
      <p className="text-primary-text font-fira-mono px-4 md:text-lg lg:px-20 lg:pt-10 xl:px-96">
        Dive into the immersive world of God of War with our expansive
        encyclopedia. Uncover the secrets of Greek and Norse mythology, navigate
        treacherous landscapes, and witness Kratos&lsquo; evolution from a
        vengeful deity to a complex character. From in-depth character profiles
        to hidden secrets, our wiki is your ultimate guide through the divine
        realms. Join us on this epic journey of knowledge, exploration, and
        celebration of the iconic God of War franchise.
      </p>
    </div>
  );
};

export default Header;
