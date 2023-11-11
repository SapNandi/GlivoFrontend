import React, { useEffect } from "react";
import "./MySpace.css";
import { useSelector, useDispatch } from "react-redux";
import DashBoardCard from "./DashBoardCard";
import { getMyProducts } from "../../actions/productAction";
import Loader from "../Layout/Loader/Loader";

const MySpace = () => {
  // const {}
  const { loading, product } = useSelector((state) => state.myProduct);
  const {isAuthenticated} = useSelector((state)=>state.user)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMyProducts());
  }, [dispatch]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="mySpace">
          <div className="content">
            {isAuthenticated ?
              product && product.map((item, index) => {
                return <DashBoardCard item={item} key={index} isAuthenticated={isAuthenticated} />;
              }):""}
            {/* <DashBoardCard /> */}
          </div>
        </div>
      )}
    </>
  );
};

export default MySpace;
