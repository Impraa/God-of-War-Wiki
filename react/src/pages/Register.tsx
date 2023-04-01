import React from "react";
import "../styles/pages/Register.scss";
import { InputInter } from "../assets/Interfaces";
import Input from "./components/Input";

const InputArr: InputInter[] = [
    {
        classname: "username",
        type: "text",
        spanText: "Username",
    },
    {
        classname: "email",
        type: "email",
        spanText: "Email",
    },
    {
        classname: "first-password",
        type: "password",
        spanText: "Password",
    },
    {
        classname: "second-password",
        type: "password",
        spanText: "Confirm Password",
    },
];

function Register() {
    return (
        <div className="register">
            <form action="">
                {InputArr.map((item: InputInter, i: number) => {
                    return <Input key={i} {...item} />;
                })}
                <button>Register</button>
            </form>
        </div>
    );
}

export default Register;
