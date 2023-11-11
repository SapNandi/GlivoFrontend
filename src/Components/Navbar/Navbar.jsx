import React, { useEffect, useState } from "react";
import "./Navbar.css";
import Backdrop from "@mui/material/Backdrop";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCartOutlined"
import AppRegistrationRounded from "@mui/icons-material/AppRegistrationRounded";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { SpeedDial, SpeedDialAction } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userAction";
import { motion } from "framer-motion";

const Navbar = ({ user, isAuthenticated }) => {
  const { cartItems } = useSelector((state) => state.cart);

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const [role, setRole] = useState("user");

  const options = [
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    { icon: <PersonIcon />, name: "Profile", func: account },
    {
      icon: (
        <ShoppingCartIcon
          style={{ color: cartItems.length > 0 ? "#121212" : "unset" }}
        />
      ),
      name: `Cart(${cartItems.length})`,
      func: cart,
    },
  ];

  useEffect(() => {
    if (isAuthenticated) {
      setRole(user.user && user.user.role);
    }
  }, [user, isAuthenticated]);

  if (isAuthenticated) {
    options.unshift({
      icon: <ExitToAppIcon />,
      name: "Logout",
      func: logoutUser,
    });
  } else {
    options.unshift({
      icon: <AppRegistrationRounded />,
      name: "SignIn",
      func: signInUser,
    });
  }

  if (role === "admin") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  function dashboard() {
    navigate("/dashboard");
  }
  function cart() {
    navigate("/cart");
  }

  function orders() {
    if (isAuthenticated) {
      navigate("/orders");
    } else {
      alert.info("Login To Access The feature");
    }
  }
  function account() {
    if (isAuthenticated) {
      navigate("/account");
    } else {
      alert.info("Login To Access The feature");
    }
  }

  function logoutUser() {
    dispatch(logout());
    setRole("user");
    alert.success("Logout Successfully");
    navigate("/");
  }

  function signInUser() {
    navigate("/loginSignup");
  }

  return (
    <div className="navbar">
      <div className="leftNav">
        <div className="Logo" style={{ marginRight: "3.3rem" }}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <img src="/logo.png" alt="" />
          </Link>
        </div>
      </div>
      <div className="rightNav">
        <ul className="items">
          <motion.li
            whileHover={{ scale: 1.2 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="item"
          >
            <a href="#">About</a>
          </motion.li>
          <motion.li
            whileHover={{ scale: 1.2 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="item"
          >
            <a href="#">Contact</a>
          </motion.li>
          <motion.li
            whileHover={{ scale: 1.2 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="item"
          >
            <a href="#">Events</a>
          </motion.li>
        </ul>
      </div>
      <div className="profile">
        <h3 className="profileTitle">
          {isAuthenticated ? user.user.name : "Hi,Guest"}
        </h3>
        <div className="wrapBox">
          <Backdrop open={open} />
          <SpeedDial
            ariaLabel="SpeedDial Tooltip Example"
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            direction="down"
            icon={
              <img
                className="speedDialIcon"
                src={isAuthenticated ? user.user.avatar.url : "/Profile.png"}
                alt="Profile"
              />
            }
            style={{ position: "fixed", top: "0.5rem" }}
          >
            {options.map((item) => (
              <SpeedDialAction
                key={item.name}
                icon={item.icon}
                tooltipTitle={item.name}
                onClick={item.func}
                tooltipOpen={window.innerWidth <= 600 ? true : false}
              />
            ))}
          </SpeedDial>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
