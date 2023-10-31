import React, { useEffect, useState, useMemo } from "react";
import "./ProductDetails.css";
import { getProductDetails } from "../../actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loader from "../Layout/Loader/Loader";
import Banner from "./Banner";
import Popup from "../Popup/Popup";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { loading, product } = useSelector((state) => state.productDetails);

  useEffect(() => {
    dispatch(getProductDetails(id));
    // console.log(product);
  }, [dispatch, id, loading]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="productDetails">
          <Banner product={product} />
          <div className="desc">
            <div className="wrapper">
              <h1 className="title">About The Event</h1>
              <p className="prod_desc">{product.description}</p>
              <hr />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
