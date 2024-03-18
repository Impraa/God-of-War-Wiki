import { NextPage } from "next";
import { useEffect, useState } from "react";
import BetterButton from "./BetterButton";
import SearchIcon from "@/assets/SearchIcon";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  fetchAllPostsAsync,
  selectAllPosts,
} from "@/redux/features/postsSlice";

interface Props {}

const SerachIsland: NextPage<Props> = ({}) => {
  const dispatch = useAppDispatch();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sort, setSort] = useState<"ASC" | "DESC" | "">("");
  const [filter, setFilter] = useState<"" | "greekMythos" | "nordicMythos">("");

  useEffect(() => {
    dispatch(fetchAllPostsAsync());
  }, []);
  return (
    <div className="border-b-4 border-primary pb-10 md:w-[90vw] flex flex-col items-center">
      <form className="flex space-x-5 font-fira-mono justify-center">
        <input
          name="searchBar"
          id="searchBar"
          className="py-3 px-4 rounded-full outline-none hover:outline-2 hover:outline-primary-text focus:ring-2 focus:ring-primary-text transition-all"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setSearchQuery(e.currentTarget.value);
          }}
          placeholder="Search..."
        />
        <button className="">
          <SearchIcon className="text-white transition-all hover:text-primary-text" />
        </button>
      </form>
      <div className="flex font-fira-mono text-xl pt-10">
        <div className="flex flex-col mr-5 mt-5">
          <label htmlFor="sort" className="text-white">
            Order by
          </label>
          <select name="sort" id="sort" className="cursor-pointer">
            <option value="" hidden>
              Choose
            </option>
            <option value={"ASC"}>Ascending</option>
            <option value={"DESC"}>Descending</option>
          </select>
        </div>
        <div className="flex flex-col mt-5 text-xl">
          <label htmlFor="sort" className="text-white">
            Choose a mythos
          </label>
          <select name="filter" id="filter" className="cursor-pointer">
            <option value="" hidden>
              Choose
            </option>
            <option value={"greekMythos"}>Greek mythos</option>
            <option value={"nordicMythos"}>Nordic mythos</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SerachIsland;
