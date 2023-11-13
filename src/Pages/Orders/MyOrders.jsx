import React, { useEffect } from "react";
import "./MyOrders.css";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, myOrders } from "../../actions/orderAction";
import Loader from "../../Components/Layout/Loader/Loader";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Typography } from "@mui/material";
import { MdOutlineLaunch } from "react-icons/md";

const MyOrders = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const columns = [
    {
      field: "id",
      headerName: "Order ID",
      minWidth: window.innerWidth < 600 ? 40 : 300,
      flex: window.innerWidth < 600 ? 0.2 : 1,
    },

    {
      field: "status",
      headerName: "Status",
      minWidth: window.innerWidth < 600 ? 50 : 150,
      flex: window.innerWidth < 600 ? 0.2 : 0.5,
      cellClassName: (params) => {
        return params.row.status === "Completed" ? "greenColor" : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: window.innerWidth < 600 ? "" : "number",
      minWidth: window.innerWidth < 600 ? 50 : 150,
      flex: window.innerWidth < 600 ? 0.2 : 0.3,
    },

    {
      field: "amount",
      headerName: "Amount",
      type: window.innerWidth < 600 ? "" : "number",
      // type: "number",
      minWidth: window.innerWidth < 600 ? 70 : 270,
      flex: window.innerWidth < 600 ? 0.2 : 0.5,
    },

    {
      field: "actions",
      flex: window.innerWidth < 600 ? 0.1 : 0.3,
      headerName: "Actions",
      minWidth: window.innerWidth < 600 ? 50 : 150,
      // type: "number",
      type: window.innerWidth < 600 ? "" : "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/order/${params.id}`}>
            <MdOutlineLaunch style={{ fontSize: "1.3rem" }} />
          </Link>
        );
      },
    },
  ];
  const rows = [];

  if (isAuthenticated) {
    orders &&
      orders.forEach((item, index) => {
        rows.push({
          itemsQty: item.orderItems.length,
          id: item._id,
          status: item.orderStatus,
          amount: item.totalPrice,
        });
      });
  }

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors);
    }
    dispatch(myOrders());
  }, [dispatch, alert]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="myOrdersPage">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="myOrdersTable"
            // autoHeight
          />
          <Typography id="myOrdersHeading">
            {isAuthenticated ? user.user.name : ""}'s Orders
          </Typography>
        </div>
      )}
    </>
  );
};

export default MyOrders;
