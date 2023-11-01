import React, { useState } from "react";
import "./Cart.css";
import { Link, useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import { useAlert } from "react-alert";
import { useSelector, useDispatch } from "react-redux";
import { addItemToCart, removeItemsFromCart } from "../../actions/cartAction";
import { createOrder } from "../../actions/orderAction";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import CartItemCart from "./CartItemCart";
import { useEffect } from "react";

const Cart = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);

  const { error, isAuthenticated } = useSelector((state) => state.user);

  const [total, setTotal] = useState(0);
  useEffect(() => {
    setTotal(
      cartItems.length > 0
        ? cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0)
        : 0
    );
  }, [cartItems, total]);

  console.log(JSON.stringify(total));

  const order = {
    orderItems: cartItems,
    totalPrice: JSON.stringify(total),
  };

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addItemToCart(id, newQty));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addItemToCart(id, newQty));
  };

  const deleteCartItem = (id) => {
    dispatch(removeItemsFromCart(id));
    alert.success("Item Removed Successfully!!");
  };

  const handleOrder = (order) => {
    if (!isAuthenticated) {
      alert.error("Login To Place Order!!!");
      navigate("/loginSignup");
      return;
    }
    dispatch(createOrder(order));
    alert.success("Order Placed Successfully!!!");
    localStorage.clear();
    navigate("/")
  };

  return (
    <>
      {cartItems.length === 0 ? (
        <div className="emptyCart">
          <RemoveShoppingCartIcon />

          <Typography>No Product in Your Cart</Typography>
          <Link to="/">View Products</Link>
        </div>
      ) : (
        <div className="cartPage">
          <div className="cartHeader">
            <p>Product</p>
            <p>Quantity</p>
            <p>Subtotal</p>
          </div>
          {cartItems &&
            cartItems.map((item) => (
              <div className="cartContainer" key={item.product}>
                <CartItemCart item={item} deleteCartItem={deleteCartItem} />
                <div className="cartInput">
                  <button
                    onClick={() =>
                      decreaseQuantity(item.product, item.quantity)
                    }
                  >
                    -
                  </button>
                  <input type="number" value={item.quantity} readOnly />
                  <button
                    onClick={() =>
                      increaseQuantity(item.product, item.quantity, item.stock)
                    }
                  >
                    +
                  </button>
                </div>
                <p className="cartSubtotal">{`₹${(
                  item.price * item.quantity
                ).toFixed(2)}`}</p>
              </div>
            ))}

          <div className="cartGrossProfit">
            <div></div>
            <div className="cartGrossProfitBox">
              <p>Gross Total</p>
              <p>{`₹${(cartItems.reduce(
                (acc, item) => acc + item.quantity * item.price,
                0
              )).toFixed(2)}`}</p>
            </div>
            <div></div>
            <div className="checkOutBtn">
              <button onClick={() => handleOrder(order)}>Check Out</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
