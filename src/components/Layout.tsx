import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout: React.FC = () => {
  return (
    <div className="page-layout">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
