import { selectAllPosts } from "@/redux/features/postsSlice";
import { useAppSelector } from "@/redux/store";
import { NextPage } from "next";
import Card from "./Card";
import Image from "next/image";

interface Props {}

const AllGodsCards: NextPage<Props> = ({}) => {
  const posts = useAppSelector(selectAllPosts);

  if (!posts) return <span>There are no gods currently stored</span>;
  return (
    <div className="flex flex-col items-center">
      {posts.map((item) => {
        return (
          <div className="my-5 group w-[90%] relative md:w-[20em] md:flex-row">
            <span
              className="absolute z-10 rounded-tl-[40%] rounded-br-[40%] top-0 bottom-0 left-0 right-0 text-white font-fira-mono backdrop-blur-xl flex items-center justify-center opacity-0 transition-opacity 
      group-hover:opacity-100 cursor-pointer text-2xl md:text-3xl"
            >
              {item.name}
            </span>
            <Image
              src={
                "http://127.0.0.1:8000/uploads/post_pictures/" +
                item.postImages[0].postImage
              }
              alt={item.name + "'s image"}
              className=" rounded-tl-[40%] rounded-br-[40%]"
              width={500}
              height={500}
            />
          </div>
        );
      })}
    </div>
  );
};

export default AllGodsCards;
