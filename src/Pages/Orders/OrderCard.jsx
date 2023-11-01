import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import "./OrderCard.css";

const OrderCard = ({ item, order }) => {
  return (
    <>
      <Box
        sx={{
          width: 1300,
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            display: "flex",
            // flexDirection: "column",
            justifyContent: "center",
            alignContent: "center",
            padding: "1rem",
            width: "100%",
          }}
        >
          <div className="orderLeft">
            <img src={item.image} alt="ssa" />
            <div>
              <Link to={`/product/${item.product}`}>{item.name}</Link>
              <span>{`Price: ₹${item.price}`}</span>
            </div>
          </div>
          <div className="orderMiddle">
            <h3>{item.quantity} X ₹{item.price}</h3>
          </div>
          <div className="orderRight">
          <h3>₹{(item.quantity*item.price).toFixed(2)}</h3>
          </div>
        </Paper>
      </Box>
    </>
  );
};

export default OrderCard;
