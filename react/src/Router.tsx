import "./Router.css";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Error404 from "./pages/Error404";
import Register from "./pages/Register";

function App() {
    return (
        <div className="routes">
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<Error404 />} />
            </Routes>
        </div>
    );
}

export default App;
