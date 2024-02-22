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
    <div className="relative h-[120vh]">
      <div className="absolute flex flex-col items-center text-center">
        <h2
          className={`${
            index % 2 == 0 ? "text-primary" : "text-secondary"
          }  py-10 font-bold text-2xl font-josefin-sans`}
        >
          {title}
        </h2>
        <p
          className={`${
            index % 2 == 0 ? "text-primary-text" : "text-secondary-text"
          } px-4 font-fira-mono`}
        >
          {text}
        </p>
        <Link
          className={`${
            index % 2 == 0
              ? "text-secondary-text bg-primary-2"
              : "text-primary-text bg-secondary-2"
          } font-fira-mono
          mt-10 text-xl px-5 py-4 rounded-full`}
          href={href}
        >
          Read more
        </Link>
      </div>
      <Image
        className="z-0 h-full w-full object-cover"
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
