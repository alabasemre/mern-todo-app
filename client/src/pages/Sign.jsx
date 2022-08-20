import React from "react";
import { useLocation } from "react-router-dom";
import SignIn from "../components/Sign/SignIn";
import SignUp from "../components/Sign/SignUp";

const Sign = () => {
    const params = useLocation();

    return <>{params.pathname === "/signup" ? <SignUp /> : <SignIn />}</>;
};

export default Sign;
