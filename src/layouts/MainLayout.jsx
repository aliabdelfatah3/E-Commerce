import React from "react";
import Header from "./Header";
import Footer from "./Footer";

function MainLayout() {
    return <>
        <Header />
        <Outlet />
        <Footer />
    </ >;
}

export default MainLayout;
