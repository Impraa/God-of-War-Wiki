import CardCarousel from "@/components/CardCarousel";
import Header from "@/components/Header";
import { NextPage } from "next";

interface Props {}

const Page: NextPage<Props> = ({}) => {
  return (
    <div>
      <Header />
      <CardCarousel />
    </div>
  );
};

export default Page;
