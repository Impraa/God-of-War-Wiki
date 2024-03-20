"use client";
import { fetchPostAsync, selectAllPosts } from "@/redux/features/postsSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { NextPage } from "next";
import { useParams } from "next/navigation";
import { useLayoutEffect } from "react";

interface Props {}

const Page: NextPage<Props> = ({}) => {
  const dispatch = useAppDispatch();
  const post =
    useAppSelector(selectAllPosts)[useAppSelector(selectAllPosts).length - 1];
  const params = useParams<{ id: string }>();

  useLayoutEffect(() => {
    dispatch(fetchPostAsync(parseInt(params.id)));
  }, []);
  console.log(post);
  return <div className="flex-grow w-full">MICA KROJACICA</div>;
};

export default Page;
