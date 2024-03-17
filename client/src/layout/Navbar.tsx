"use client";
import Hamburger from "@/assets/Hamburger";
import Logo from "@/assets/Logo";
import UserIcon from "@/assets/UserIcon";
import BetterButton from "@/components/BetterButton";
import NavItems from "@/components/NavItems";
import { logoutUser, selectCurrentUser } from "@/redux/features/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Props {}

const navItems = [
  { link: "/", text: "Home" },
  { link: "/search", text: "Search" },
];

const authItems = [
  { link: "/login", text: "Login" },
  { link: "/register", text: "Register" },
];

const Navbar: NextPage<Props> = ({}) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const [width, setWidth] = useState(0);
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const handleResize = () => {
    const newWidth = window.innerWidth;
    setWidth(newWidth);
    setIsOpened(newWidth >= 768);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize, false);
  }, [width]);

  return (
    <nav
      className="flex flex-col justify-center items-center w-full py-8 bg-nav-footer transition-all font-josefin-sans
    md:flex-row md:justify-start md:py-10 md:px-10 max-w-[1440px]"
    >
      <div className="flex justify-center  items-center pb-4 lg:pb-0">
        <Link href="/" className=" pr-10">
          {" "}
          <Logo />{" "}
        </Link>
        <Hamburger
          className="hover: cursor-pointer md:hidden"
          onClick={() => setIsOpened(!isOpened)}
        />
      </div>
      <div
        className={
          isOpened
            ? "h-inherit visible opacity-100 transition-all flex flex-col md:flex-row md:justify-between md:w-full"
            : "h-0 invisible opacity-0 transition-all flex flex-col md:opacity-1"
        }
      >
        <div className="flex flex-col md:flex-row md:space-x-2">
          {navItems.map((item, i) => {
            return <NavItems key={i} {...item} />;
          })}
        </div>
        <div className="flex flex-col md:flex-row md:space-x-2">
          {user ? (
            <span className="flex flex-col items-start md:flex-row md:space-x-5 md:items-center">
              <span className="flex items-center ">
                <NavItems
                  key={user.id}
                  link={`/profile/${user.id}`}
                  text={user.username}
                />
                <UserIcon className="ml-2 text-primary" />
              </span>
              <button
                className="text-primary-text text-xl transition-all hover:text-primary"
                onClick={handleLogout}
              >
                Logout
              </button>
            </span>
          ) : (
            authItems.map((item, i) => {
              return <NavItems key={i} {...item} />;
            })
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
