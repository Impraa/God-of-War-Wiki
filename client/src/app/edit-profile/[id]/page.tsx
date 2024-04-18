"use client";
import AllGodsCards from "@/components/AllGodsCards";
import ProfileHeader from "@/components/ProfileHeader";
import {
  fetchSingleProfileAsync,
  selectFoundUser,
} from "@/redux/features/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { NextPage } from "next";
import { useParams } from "next/navigation";
import { useEffect } from "react";

interface Props {}

const Page: NextPage<Props> = ({}) => {
  const foundUser = useAppSelector(selectFoundUser);
  const dispatch = useAppDispatch();
  const params = useParams<{ id: string }>();

  useEffect(() => {
    dispatch(fetchSingleProfileAsync(parseInt(params.id)));
  }, []);

  if (!foundUser) return <span>Profile is nonexistant</span>;
  return <div className="flex flex-col flex-grow">mac</div>;
};

export default Page;
