import React from "react";
import { NavItemInter } from "../assets/Interfaces";
import NavTitle from "./components/NavTitle";
import NavItems from "./components/NavItems";

const NavItem: NavItemInter[] = [
    { text: "Home", path: "/" },
    { text: "Contact", path: "/contact" },
];

const UserItem: NavItemInter[] = [
    { text: "Login", path: "/login" },
    { text: "Sign up", path: "/signup" },
];

function Navbar() {
    return (
        <div className="flex flex-col lg:flex-row h-14 lg:h-20 items-center justify-between text-xl py-4">
            <NavTitle />
            <div className="lg:flex flex-col hidden lg:flex-row navigaton">
                {NavItem.map((navitem: NavItemInter, i: number) => {
                    return <NavItems key={i} {...navitem} />;
                })}
            </div>
            <div className="lg:flex flex-col hidden lg:flex-row user md:mr-10">
                {UserItem.map((navitem: NavItemInter, i: number) => {
                    return <NavItems key={i} {...navitem} />;
                })}
            </div>
        </div>
    );
}

export default Navbar;
