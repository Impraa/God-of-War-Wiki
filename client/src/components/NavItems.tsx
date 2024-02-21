import { NextPage } from "next";
import Link from "next/link";

interface Props {
  link: string;
  text: string;
}

const NavItems: NextPage<Props> = ({ link, text }) => {
  return (
    <Link
      className="text-primary-text text-xl py-1 transition-all hover:text-primary"
      href={link}
    >
      {text}
    </Link>
  );
};

export default NavItems;
