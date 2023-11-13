import React, { useEffect, useState } from "react";
import "./MySpace.css";
import { useSelector, useDispatch } from "react-redux";
import DashCard from "../Card/DashCard";
import DashBoardCard from "../Dashboard/DashBoardCard";
import { getMyProducts } from "../../actions/productAction";
import Loader from "../Layout/Loader/Loader";
import { MdOutlineEmojiEvents } from "react-icons/md";
import { BsTicketPerforated } from "react-icons/bs";
// import { TbPigMoney } from "react-icons/tb";
import {FaMoneyCheckDollar} from "react-icons/fa6"
import DashCardNormal from "../Card/DashCardNormal";

// #383838

const MySpace = () => {
  const { loading, product, productsCount } = useSelector(
    (state) => state.myProduct
  );
  const { isAuthenticated } = useSelector((state) => state.user);

  // const [totalTicketSold, setTotalTicketSold] = useState(0);

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
            <div className="wrapperUp">
              <div className="mywrapper">
                <DashCard
                  productsCount={productsCount}
                  product={0}
                  limitPercentage={65}
                  title={"Events Created"}
                  subtitle={"Latest Updated"}
                  dashIcon={
                    <MdOutlineEmojiEvents
                      style={{
                        fontSize: "3.3rem",
                        marginBottom: ".2rem",
                        color: "#fff",
                      }}
                    />
                  }
                />
                <DashCardNormal
                  product={product}
                  dashIcon={
                    <FaMoneyCheckDollar
                      style={{
                        fontSize: "3.3rem",
                        marginBottom: ".2rem",
                        color: "#C8EE44",
                      }}
                    />
                  }
                />
                <DashCard
                  productsCount={productsCount}
                  product={product}
                  limitPercentage={80}
                  title={"Tickets Sold"}
                  subtitle={"Latest Updated"}
                  dashIcon={
                    <BsTicketPerforated
                      style={{
                        fontSize: "3.3rem",
                        marginBottom: ".2rem",
                        color: "#fff",
                        marginLeft: "10px",
                      }}
                    />
                  }
                />
              </div>
            </div>
            <div className="wrapperDown">
              <h2>Events Created</h2>
              <div className="mywrapper">
                {isAuthenticated ? (
                  product === undefined ? (
                    <h1 style={{ fontFamily: "Roboto" }}>
                      No Events Created!!!
                    </h1>
                  ) : (
                    product &&
                    product.map((item, index) => {
                      return (
                        <>
                          <DashBoardCard
                            item={item}
                            key={index}
                            isAuthenticated={isAuthenticated}
                          />
                        </>
                      );
                    })
                  )
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MySpace;
