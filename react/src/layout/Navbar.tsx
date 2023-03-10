import React, { useEffect, useState } from "react";
import { NavItemInter } from "../assets/Interfaces";
import { Squeeze as Hamburger } from "hamburger-react";
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
    const [activeHam, setActiveHam] = useState<boolean>(false);
    const [isOpen, setOpen] = useState(false);
    const [style, setStyle] = useState<boolean>(false);

    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        window.onresize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };
    }, []);

    return (
        <div
            className={
                style
                    ? "flex flex-col lg:flex-row h-30 lg:h-20 items-center justify-between text-xl py-4"
                    : "flex flex-col lg:flex-row h-14 lg:h-20 items-center justify-between text-xl py-4"
            }
        >
            <div className="flex flex-row">
                <NavTitle />
                <span className={windowSize.width < 1024 ? "inline" : "hidden"}>
                    <Hamburger
                        onToggle={(toggled) => {
                            if (toggled) {
                                setStyle(true);
                            } else {
                                setStyle(false);
                            }
                        }}
                        color="black"
                        easing="ease-out"
                        rounded
                    />
                </span>
            </div>
            <div
                className={
                    style
                        ? "transition-opacity flex flex-col lg:flex-row"
                        : "lg:flex flex-col invisible opacity-0 lg:flex-row"
                }
            >
                {NavItem.map((navitem: NavItemInter, i: number) => {
                    return <NavItems key={i} {...navitem} />;
                })}
            </div>
            <div
                className={
                    style
                        ? "transition-opacity flex flex-col lg:flex-row user lg:mr-10"
                        : "lg:flex flex-col opacity-0 invisible lg:flex-row user lg:mr-10"
                }
            >
                {UserItem.map((navitem: NavItemInter, i: number) => {
                    return <NavItems key={i} {...navitem} />;
                })}
            </div>
        </div>
    );
}

export default Navbar;
