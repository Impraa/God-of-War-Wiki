"use client";
import { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";

interface Props {
  title: string;
  text: string;
  href: string;
  src: string;
  alt: string;
  index: number;
}

const TextWithBackground: NextPage<Props> = ({
  title,
  text,
  href,
  src,
  alt,
  index,
}) => {
  return (
    <div className="relative h-[120vh] md:h-[100vh]">
      <div className="absolute flex flex-col h-full items-center justify-around text-center">
        <h2
          className={`${
            index % 2 == 0 ? "text-primary" : "text-secondary"
          }  py-10 font-bold text-2xl font-josefin-sans md:py-20 md:text-4xl xl:text-5xl`}
        >
          {title}
        </h2>
        <p
          className={`${
            index % 2 == 0 ? "text-primary-text" : "text-secondary-text"
          } px-4 font-fira-mono md:text-lg lg:px-20 xl:px-96`}
        >
          {text}
        </p>
        <Link
          className={`transition-all ${
            index % 2 == 0
              ? "text-secondary-text bg-primary-2 hover:text-white hover:bg-primary"
              : "text-primary-text bg-secondary-2 hover:text-white hover:bg-secondary"
          } hover:scale-125 font-fira-mono
           text-xl px-5 py-4 rounded-full md:text-2xl`}
          href={href}
        >
          Read more
        </Link>
      </div>
      <Image
        className="z-0 h-full w-full object-cover xl:w-[100vw]"
        width={1440}
        quality={100}
        height={802}
        src={src}
        alt={alt}
      />
    </div>
  );
};

export default TextWithBackground;
