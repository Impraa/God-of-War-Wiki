import { NextPage } from "next";
import { useEffect, useState } from "react";
import BetterButton from "./BetterButton";
import SearchIcon from "@/assets/SearchIcon";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  fetchAllPostsAsync,
  selectAllPosts,
} from "@/redux/features/postsSlice";
import { Options } from "@/utils/types";

interface Props {}

const SerachIsland: NextPage<Props> = ({}) => {
  const posts = useAppSelector(selectAllPosts);
  const dispatch = useAppDispatch();
  const [options, setOptions] = useState<Options>({});

  useEffect(() => {
    if (posts.length < 1) dispatch(fetchAllPostsAsync(options));
  }, [options]);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => {
    setOptions((oldFormData) => ({
      ...oldFormData,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="border-b-4 border-primary pb-10 md:w-[90vw] flex flex-col items-center">
      <div className="flex space-x-5 font-fira-mono justify-center">
        <input
          name="searchQuery"
          id="searchQuery"
          onChange={handleChange}
          className="py-3 px-4 rounded-full outline-none hover:outline-2 hover:outline-primary-text focus:ring-2 focus:ring-primary-text transition-all"
          placeholder="Search..."
        />
      </div>
      <div className="flex font-fira-mono text-xl pt-10">
        <div className="flex flex-col mr-5 mt-5">
          <label htmlFor="sort" className="text-white">
            Order by
          </label>
          <select
            name="sort"
            id="sort"
            className="cursor-pointer"
            onChange={handleChange}
          >
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
          <select
            name="filter"
            id="filter"
            onChange={handleChange}
            className="cursor-pointer"
          >
            <option value="" hidden>
              Choose
            </option>
            <option value={"greek_mythos"}>Greek mythos</option>
            <option value={"nordic_mythos"}>Nordic mythos</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SerachIsland;
