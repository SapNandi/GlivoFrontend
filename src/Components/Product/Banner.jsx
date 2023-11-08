import React, { useState } from "react";
import { BsFillStarFill, BsCart4 } from "react-icons/bs";
import "./Banner.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import TicketForm from "../Forms/TicketForm";
import { Button } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Banner = ({ product }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <div className="productBanner">
        <div
          className="prodWrapper"
          style={{
            backgroundImage: `linear-gradient(90deg, #1A1A1A 24.97%, #1A1A1A 38.3%, rgba(26, 26, 26, 0.0409746) 97.5%, #1A1A1A 100%), url(${
              product.bgImage && product.bgImage.url
            })`,
          }}
        >
          <div className="left">
            <div className="productImage">
              <img
                src={product.images && product.images.url}
                alt={product.name}
              />
            </div>
          </div>
          <div className="right">
            <h1 className="prodTitle">{product.name}</h1>
            <div>
              <BsFillStarFill color="rgb(248, 68, 100)" size={"1.7rem"} />
              <span className="productCardSpan">
                <h3
                  style={{
                    marginRight: "10px",
                    marginLeft: "10px",
                    fontSize: "1.8rem",
                    fontFamily: "Roboto",
                  }}
                >
                  {product.rating} / 5{" "}
                </h3>
                <p style={{ marginTop: "8px", fontFamily: "Roboto" }}>
                  {product.numOfReviews} Reviews
                </p>
              </span>
            </div>
            <span
              style={{
                fontFamily: "Roboto",
                display: "flex",
                alignItems: "center",
                fontSize: "1.2rem",
              }}
            >
              <h4
                style={{
                  color: "rgb(248, 68, 100)",
                  marginRight: "5px",
                  fontSize: "1.2rem",
                  letterSpacing: ".3px",
                }}
              >
                Price:
              </h4>{" "}
              {`$${product.price}`}
            </span>
            <h4
              style={{
                fontFamily: "Roboto",
                letterSpacing: ".3px",
                // fontWeight: "normal",
                fontSize: "1.2rem",
                color: "rgb(248, 68, 100)",
              }}
            >
              Stock: <span style={{ color: "#4cbb17" }}>{product.supply}</span>
            </h4>
            <Link style={{ textDecoration: "none" }}>
              <motion.h1
                className="bookingButton"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                onClick={handleOpen}
              >
                Book Ticket
              </motion.h1>
            </Link>
            <Dialog
              open={open}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleClose}
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle>{"Buy Ticket"}</DialogTitle>
              <DialogContent>
                {/* <DialogContentText id="alert-dialog-slide-description">
                </DialogContentText> */}
                <TicketForm />
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={handleClose}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "10px",
                    color: "rgba(0, 0, 0, 1)",
                  }}
                >Cancel</Button>
                {/* <Button onClick={handleClose}>Agree</Button> */}
              </DialogActions>
            </Dialog>
          </div>
        </div>
        {/* <div className=""></div> */}
      </div>
    </>
  );
};

export default Banner;
