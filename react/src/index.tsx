import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./Router";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <BrowserRouter>
        <Navbar />
        <Router />
        <Footer />
    </BrowserRouter>
);
