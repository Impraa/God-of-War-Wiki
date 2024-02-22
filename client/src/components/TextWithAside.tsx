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
    <div className={`flex flex-col items-center`}>
      <div className={`flex flex-col items-center`}>
        <h2
          className={`${
            index % 2 == 0
              ? "text-primary border-primary"
              : "text-secondary border-secondary"
          }
        text-2xl font-bold text-2xl font-josefin-sans text-center pt-10 pb-5 border-b-2 mx-4`}
        >
          {title}
        </h2>
        <p
          className={`${
            index % 2 == 0 ? "text-primary-text" : "text-secondary-text"
          } mx-5 py-5`}
        >
          {text}
        </p>
      </div>
      <Image src={src} alt={alt} width={618} height={844} />
    </div>
  );
};

export default TextWithAside;
