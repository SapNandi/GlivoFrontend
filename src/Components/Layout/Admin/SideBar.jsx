import React, { useState, useEffect } from "react";
import "./SideBar.css";
import { Link, useLocation, useParams } from "react-router-dom";
import { IoCreate } from "react-icons/io5";
import { IoFlask } from "react-icons/io5";
import { IoEye } from "react-icons/io5";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";

const SideBar = () => {
  const [active, setActive] = useState("");
  const pathName = useLocation();
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  useEffect(() => {
    setActive(pathName.pathname.substring(1));
  }, [pathName]);

  return (
    <div className={open ? "sideBar sideBarClose" : "sideBar"}>
      <div className={open ? "arrowChange" : "openClose"}>
        <BsFillArrowLeftCircleFill
          onClick={handleClick}
          className={open ? "arrow open" : "arrow"}
          style={{
            fontSize: "2rem",
            width: "100%",
            height: "100%",
            color: "#E7E7E7",
          }}
        />
      </div>
      <div className="admin_logo">
        <Link to={"/"}>
          <img src="/Glivo.jpg" alt="" />
        </Link>
        <div className={open ? "content barOpen" : "content barClose"}>
          <h1 className="title">Saptarshi Nandi</h1>
          <p className="subtitle">Music Production</p>
        </div>
      </div>
      <Link to={"/dashboard"}>
        <div
          className={
            active === "dashboard" ? "createEvent active" : "createEvent"
          }
        >
          <span>
            <IoFlask style={{ fontSize: "1.8rem" }} />{" "}
          </span>
          <h3 className={open ? "sidetitle barOpen" : "sidetitle barClose"}>Create Event</h3>
        </div>
      </Link>
      <Link to={"/mySpace"}>
        <div className={active === "mySpace" ? "mySpace active" : "mySpace"}>
          <span>
            <IoEye style={{ fontSize: "1.8rem" }} />{" "}
          </span>
          <h3 className={open ? "sidetitle barOpen" : "sidetitle barClose"}>My Space</h3>
        </div>
      </Link>
    </div>
  );
};

export default SideBar;
