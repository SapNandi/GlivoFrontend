import React from "react";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";
import Footer from "../../Footer/Footer";

const AdminDesign = () => {
  return (
    <>
    <div className="box" style={{ width: "100%", height: "100%", display:"flex"}}>
      <SideBar />
      <Outlet />
    </div>
    </>
  );
};

export default AdminDesign;
