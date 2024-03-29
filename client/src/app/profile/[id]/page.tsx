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
  return (
    <div className="flex flex-col flex-grow">
      <ProfileHeader user={foundUser} />
      <h2 className="text-primary text-2xl font-bold pt-5 px-5 font-josefin-sans lg:text-3xl">
        Bio
      </h2>
      <p className="mx-5 text-white border-b-2 border-secondary pb-10 pt-5 font-fira-mono lg:text-lg">
        {foundUser.bio}
      </p>
      <div className="px-5">
        <h2 className="text-secondary font-josefin-sans text-2xl pt-5 lg:text-3xl">
          Favourite gods
        </h2>
        <AllGodsCards posts={foundUser.favouritePosts} />
      </div>
    </div>
  );
};

export default Page;
