"use client";
import { NextPage } from "next";
import Image from "next/image";
import { useState, useEffect } from "react";

interface Props {
  src: string;
  alt: string;
  name: string;
}

const Card: NextPage<Props> = ({ src, alt, name }) => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const handleResize = () => {
    const newWidth = window.innerWidth;
    setWidth(newWidth);
    const newHeight = window.innerHeight;
    setHeight(newHeight);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize, false);
  }, [width, height]);

  return (
    <div className="relative rounded-tl-full rounded-br-full group w-full h-full z-10">
      <span
        className="absolute z-10 text-primary backdrop-blur-xl w-full h-full flex items-center justify-center opacity-0 transition-opacity 
      group-hover:opacity-100 cursor-pointer text-2xl"
      >
        {name}
      </span>
      <Image
        className="w-full h-full z-0 "
        width={width}
        height={height}
        src={src}
        alt={alt}
      />
    </div>
  );
};

export default Card;
