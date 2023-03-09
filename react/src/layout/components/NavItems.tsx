import React from "react";
import { NavItemInter } from "../../assets/Interfaces";
import { Link } from "react-router-dom";

function NavItems(props: NavItemInter) {
    return (
        <Link className="md:mx-2" to={props.path}>
            {props.text}
        </Link>
    );
}

export default NavItems;
