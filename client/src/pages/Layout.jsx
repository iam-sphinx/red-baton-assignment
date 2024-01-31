import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
const Layout = () => {
  return (
    <div className="min-h-screen flex justify-center m-2">
      <div className="w-[1278px] bg-[#f6f6ef] flex flex-col justify-between">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
