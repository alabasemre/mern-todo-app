import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux/es/exports";

import Menu from "./components/Menu/Menu";
import Home from "./pages/Home";
import Sign from "./pages/Sign";

import "./globals.css";
import Socials from "./components/Socials/Socials";

function App() {
    const user = useSelector((state) => state.user.user);

    return (
        <>
            <Menu />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route
                    path="signin"
                    element={user ? <Navigate to="/" replace /> : <Sign />}
                />
                <Route
                    path="signup"
                    element={user ? <Navigate to="/" replace /> : <Sign />}
                />
            </Routes>
            <Socials />
        </>
    );
}

export default App;
