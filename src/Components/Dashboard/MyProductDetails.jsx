import React, { useEffect } from "react";
import "./MyProductDetails.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductDetails } from "../../actions/productAction";
import { DataGrid } from "@mui/x-data-grid";
import { Typography } from "@mui/material";
import Loader from "../Layout/Loader/Loader";

const MyProductDetails = () => {
  const dispatch = useDispatch();
  const { loading, product } = useSelector((state) => state.productDetails);
  const { id } = useParams();

  const columns = [
    {
      field: "id",
      headerName: "Order ID",
      minWidth: window.innerWidth < 600 ? 100 : 300,
      flex: window.innerWidth < 600 ? 0.2 : 1,
    },

    {
      field: "name",
      headerName: "Name",
      minWidth: window.innerWidth < 600 ? 50 : 150,
      flex: window.innerWidth < 600 ? 0.2 : 0.5,
    },
    {
      field: "email",
      headerName: "Email",
      type: window.innerWidth < 600 ? "" : "number",
      minWidth: window.innerWidth < 600 ? 50 : 150,
      flex: window.innerWidth < 600 ? 0.2 : 0.5,
    },
  ];
  const rows = [];

  if (product.customer !== undefined) {
    product.customer.forEach((item, index) => {
      rows.push({
        id: item._id,
        name: item.username,
        email: item.email,
      });
    });
  }

  useEffect(() => {
    dispatch(getProductDetails(id));
    // console.log(product);
  }, [dispatch, id, loading]);

  //   console.log(`Array : ${product.customer}`);

  return (
    <>
      {!loading ? (
        product.customer && product.customer.length === 0 ? (
          <div className="myProductDetails">
            <div className="content">
              <h1>No Customers</h1>
            </div>
          </div>
        ) : (
          <div className="myProductDetails">
            <div className="content">
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                className="myOrdersTable"
                autoHeight
              />
              <Typography id="myOrdersHeading">
                Customers Of The Event
              </Typography>
            </div>
          </div>
        )
      ) : (
        <Loader />
      )}
    </>
  );
};

export default MyProductDetails;
