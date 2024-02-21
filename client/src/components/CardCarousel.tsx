"use client";
import { NextPage } from "next";
import Card from "./Card";
import { useState } from "react";
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
];

const CardCarousel: NextPage<Props> = ({}) => {
  return (
    <Carousel
      className="flex w-full h-full py-5"
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
