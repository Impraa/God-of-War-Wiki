import { selectAllPosts } from "@/redux/features/postsSlice";
import { useAppSelector } from "@/redux/store";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

interface Props {}

const AllGodsCards: NextPage<Props> = ({}) => {
  const posts = useAppSelector(selectAllPosts);

  if (!posts) return <span>There are no gods currently stored</span>;
  return (
    <div className="flex flex-col items-center md:flex-row md:flex-wrap md:justify-center md:space-x-10">
      {posts.map((item) => {
        return (
          <div className="my-5 group relative w-[20rem] h-96">
            <Link
              href={`/post/${item.id}`}
              className="absolute z-10 rounded-tl-[40%] rounded-br-[40%] top-0 bottom-0 left-0 right-0 text-white font-fira-mono backdrop-blur-xl flex items-center justify-center opacity-0 transition-opacity 
      group-hover:opacity-100 cursor-pointer text-2xl  min-h-[100%] md:text-3xl"
            >
              {item.name}
            </Link>
            <Image
              src={
                "http://127.0.0.1:8000/uploads/post_pictures/" +
                item.postImages[0].postImage
              }
              alt={item.name + "'s image"}
              className=" rounded-tl-[40%] rounded-br-[40%]"
              fill={true}
            />
          </div>
        );
      })}
    </div>
  );
};

export default AllGodsCards;
