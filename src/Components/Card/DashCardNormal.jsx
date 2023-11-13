import React, { useEffect, useState } from "react";
import "./DashCard.css";
import { MdOutlineEmojiEvents } from "react-icons/md";

const DashCardNormal = ({ product, dashIcon }) => {
  const limitValue = 50;
  let [value, setValue] = useState(0);
  let [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(
      product !== undefined
        ? product.reduce(
            (acc, item) => acc + item.normalTicketsSold * item.price,
            0
          )
        : 0
    );

    const valueInterval = setInterval(() => {
      value = value + 1;
      setValue(value);

      if (value >= limitValue) {
        clearInterval(valueInterval);
      }
    }, 10);
  }, []);
  return (
    <>
      <div className="dashcard">
        <div className="normaldashleft">
          <div className="cover">{dashIcon}</div>
        </div>
        <div className="normaldashright">
          <p>Total Earning</p>
          <h1>$ {value > limitValue ? total : value}</h1>
        </div>
      </div>
    </>
  );
};

export default DashCardNormal;
