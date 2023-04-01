import React from "react";
import { InputInter } from "../../assets/Interfaces";

function Input(props: InputInter) {
    return (
        <div className={props.classname}>
            <input type={props.type} required />
            <span>{props.spanText}</span>
        </div>
    );
}

export default Input;
