"use client";
import { NextPage } from "next";
import Image from "next/image";

interface Props {
  src: string;
  alt: string;
  name: string;
}

const Card: NextPage<Props> = ({ src, alt, name }) => {
  return (
    <div className="relative rounded-tl-full rounded-br-full group w-full h-full z-10">
      <span
        className="absolute z-10 text-primary backdrop-blur-xl w-full h-full flex items-center justify-center opacity-0 transition-opacity 
      group-hover:opacity-100 cursor-pointer text-2xl"
      >
        {name}
      </span>
      <Image
        className={"z-0"}
        width={320}
        quality={100}
        height={485}
        src={src}
        alt={alt}
      />
    </div>
  );
};

export default Card;
