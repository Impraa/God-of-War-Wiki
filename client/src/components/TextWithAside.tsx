import { NextPage } from "next";
import Image from "next/image";

interface Props {
  title: string;
  text: string;
  alt: string;
  src: string;
  index: number;
}

const TextWithAside: NextPage<Props> = ({ title, text, src, alt, index }) => {
  return (
    <div className={`flex flex-col items-center md:flex-row md:h-[100vh]`}>
      <div
        className={`${
          index % 2 == 0 ? "md:order-last" : "md:order-1"
        } flex flex-col items-center`}
      >
        <h2
          className={`${
            index % 2 == 0
              ? "text-primary border-primary"
              : "text-secondary border-secondary"
          }
        font-bold text-2xl font-josefin-sans text-center pt-10 pb-5 border-b-2 mx-4 lg:text-3xl lg:mx-9 xl:text-4xl xl:px-10`}
        >
          {title}
        </h2>
        <p
          className={`${
            index % 2 == 0 ? "text-primary-text" : "text-secondary-text"
          } mx-5 py-5 font-fira-mono md:text-sm md:py-10 lg:px-10 xl:text-lg xl:px-44`}
        >
          {text}
        </p>
      </div>
      <Image
        className={`${
          index % 2 == 0 ? "md:order-1" : "md:order-last"
        } md:h-[65%] lg:h-[90%] xl:h-[100%] xl:w-full`}
        src={src}
        alt={alt}
        width={618}
        height={844}
      />
    </div>
  );
};

export default TextWithAside;
