"use client";
import {
  fetchPostAsync,
  selectAllPosts,
  selectSinglePost,
} from "@/redux/features/postsSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { NextPage } from "next";
import { useParams } from "next/navigation";
import { useLayoutEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import Image from "next/image";
import GodInfo from "@/components/GodInfo";
import CommentSection from "@/components/CommentSection";
import { selectCurrentUser } from "@/redux/features/userSlice";

interface Props {}

const Page: NextPage<Props> = ({}) => {
  const user = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const post = useAppSelector(selectSinglePost);
  const params = useParams<{ id: string }>();

  useLayoutEffect(() => {
    dispatch(fetchPostAsync(parseInt(params.id)));
  }, [window.location.pathname]);
  if (!post)
    return <span>The god you are looking for is currently unavaliable</span>;
  return (
    <div className="flex-grow w-full max-w-[1440px]">
      <div className="flex h-full flex-col lg:flex-row">
        <Carousel
          className="flex w-full h-full pb-10 px-5 md:w-[50vw] lg:w-[125em] self-center"
          showThumbs={false}
          swipeable={false}
          autoPlay
          interval={7200}
          stopOnHover
          showStatus={false}
          showIndicators={false}
          infiniteLoop
          showArrows={false}
        >
          {post.postImages.map((item: { id: number; postImage: string }) => {
            return (
              <div
                key={item.id}
                className="relative rounded-tl-full rounded-br-full w-full h-[40em] z-10"
              >
                <Image
                  fill={true}
                  quality={100}
                  className="rounded-3xl absolute inset-0 w-full h-full object-cover"
                  src={
                    "http://127.0.0.1:8000/uploads/post_pictures/" +
                    item.postImage
                  }
                  alt={post.name + "'s picture"}
                />
              </div>
            );
          })}
        </Carousel>
        <GodInfo post={post} user={user} />
      </div>
      <CommentSection user={user} post={post} />
    </div>
  );
};

export default Page;
