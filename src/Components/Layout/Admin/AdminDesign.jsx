import React from "react";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";

const AdminDesign = () => {
  return (
    <div className="box" style={{ width: "100%", height: "auto", display:"flex", boxSizing:"border-box" }}>
      <SideBar />
      <Outlet />
    </div>
  );
};

export default AdminDesign;
