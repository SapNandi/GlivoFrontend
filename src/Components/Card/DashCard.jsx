import React, { useEffect, useState } from "react";
import "./DashCard.css";

const DashCard = ({ productsCount, product, limitPercentage, dashIcon, title, subtitle }) => {

  const limitValue = 50;
  let [percentage, setPercentage] = useState(0);
  let [value, setValue] = useState(0);
  let [total, setTotal] = useState(0);

  useEffect(() => {
    if (product !== 0) {
      setTotal(
        product !== undefined
          ? product.reduce((acc, item) => acc + item.normalTicketsSold, 0)
          : 0
      );
    }

    const interval = setInterval(() => {
      percentage = percentage + 1;
      setPercentage(percentage);

      if (percentage >= limitPercentage) {
        // console.log(percentage);
        clearInterval(interval);
      }
    }, 10);

    const valueInterval = setInterval(() => {
      value = value + 1;
      setValue(value);

      if (value > limitValue) {
        clearInterval(valueInterval);
      }
    }, 10);
  }, []);

  return (
    <>
      <div className="dashcard">
        <div className="dashleft">
          {dashIcon}
          <p>{title}</p>
          <h1>{value > limitValue ? total || productsCount : value}</h1>
          <small>{subtitle}</small>
        </div>
        <div className="dashright">
          <div
            className="cicular_progress"
            style={{
              backgroundImage: `conic-gradient(#fff ${
                percentage * 3.6
              }deg, #5b5858b2 0deg)`,
            }}
          >
            <span className="progress">{percentage}%</span>
          </div>
        </div>
        {/* <h4>245</h4> */}
      </div>
    </>
  );
};

export default DashCard;
