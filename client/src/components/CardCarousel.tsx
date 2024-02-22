"use client";
import { NextPage } from "next";
import Card from "./Card";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

interface Props {}

const images = [
  {
    src: "/Kratos.png",
    alt: "Image of Kratos",
    name: "Kratos",
  },
  {
    src: "/Ares.png",
    alt: "Image of Ares",
    name: "Ares",
  },
  {
    src: "/Zeus.png",
    alt: "Image of zeus",
    name: "Zeus",
  },
];

const CardCarousel: NextPage<Props> = ({}) => {
  return (
    <Carousel
      className="flex w-full h-full py-10 md:w-[50vh] lg"
      showThumbs={false}
      swipeable={false}
      autoPlay
      stopOnHover
      showStatus={false}
      infiniteLoop
      showArrows
    >
      {images.map((item, i) => {
        return <Card key={i} {...item} />;
      })}
    </Carousel>
  );
};

export default CardCarousel;
