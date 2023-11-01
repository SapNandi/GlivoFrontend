import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Loader from "../../Components/Layout/Loader/Loader";
import { useSelector, useDispatch } from "react-redux";
import { Paper, Typography, Box } from "@mui/material";
import { getOrderDetails, clearErrors } from "../../actions/orderAction";
import "./OrderDetails.css";
import { useAlert } from "react-alert";
import OrderCard from "./OrderCard";

const OrderDetails = () => {
  const { id } = useParams();
  const { loading, error, order } = useSelector((state) => state.orderDetails);
  const { isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  useEffect(() => {
    console.log(order);
    if (isAuthenticated === true) {
      dispatch(getOrderDetails(id));
    } else {
      alert.info("Login to access!!!");
      navigate("/loginSignup");
    }
  }, [dispatch, loading, id]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="orderDetails">
          {isAuthenticated ? (
            order.orderItems !== undefined ? (
              order.orderItems.map((item, index) => {
                return <OrderCard key={index} item={item} />;
              })
            ) : (
              <OrderCard item={order && order.orderItems} />
            )
          ) : (
            ""
          )}

          <Box
            sx={{
              width: 1300,
              display: "flex",
              justifyContent: "end",
              alignContent: "center",
            }}
          >
            <Paper
              elevation={3}
              sx={{
                width: 400,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div className="subTotal">
                <p>In Total: </p>
                <p>{isAuthenticated ? order.totalPrice : ""}</p>
              </div>
              <div className="subTotal">
                <p>Tax Inclusions: </p>
                <p>{isAuthenticated ? order.taxPrice : ""}</p>
              </div>
              <div className="subTotal">
                <p>Grand Total: </p>
                <p>{isAuthenticated ? order.totalPrice : ""}</p>
              </div>
            </Paper>
          </Box>
        </div>
      )}
    </>
  );
};

export default OrderDetails;
