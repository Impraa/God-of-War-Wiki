import React from "react";
import "../styles/pages/Register.scss";

function Register() {
    return (
        <div className="register">
            <form action="">
                <div className="username">
                    <input type="text" required />
                    <span>Username </span>
                </div>
                <div className="email">
                    <input type="email" required />
                    <span>Email </span>
                </div>
                <div className="first-password">
                    <input type="text" required />
                    <span>Password </span>
                </div>
                <div className="second-password">
                    <input type="text" required />
                    <span>Confirm Password</span>
                </div>
                <button>Register</button>
            </form>
        </div>
    );
}

export default Register;
