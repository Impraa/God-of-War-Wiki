import React from "react";
import "../../styles/pages/components/Hero.scss";
import Zeus from "../../assets/Zeus.png";
import { Link } from "react-router-dom";

function Hero() {
    return (
        <div className="hero">
            <img src={Zeus} className="zeusImg" alt="" />
            <div className="text">
                <h2 className="title">
                    Chronicles of the God of War: The Epic Journey through
                    Ancient Greek Mythology
                </h2>
                <p className="description">
                    Delve into the world of Kratos and uncover the secrets of
                    the pre-Nordic era God of War games. From battles against
                    the gods of Olympus to encounters with the Titans and
                    Mythological creatures, this website is the ultimate
                    resource for fans of the series.
                </p>
                <Link to={"/"}>
                    <button className="explore-btn">Explore now</button>
                </Link>
            </div>
        </div>
    );
}

export default Hero;
