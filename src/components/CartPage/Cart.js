import React, { useState, useEffect, useContext } from "react";
import { Button } from "react-bootstrap";

import CartItems from "./CartItems";
import { useNavigate } from "react-router-dom";
import ZomatoContext from "../../context/ZomatoContext";

const Cart = () => {
  const {
    state: { cart },
  } = useContext(ZomatoContext);

  const navigate = useNavigate();

  const [total, setTotal] = useState(0);

  const rest_id = sessionStorage.getItem("restaurantId");

  const totalPrice = () => {
    const totalCost = cart.reduce(
      (prev, curr) => prev + Number(curr.menu_price) * Number(curr.qty),
      0
    );

    setTotal(totalCost);
  };

  useEffect(() => {
    totalPrice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);

  return (
    <div
      style={{
        width: "80%",
        margin: "6rem auto",
      }}
    >
      {cart.length > 0 ? <CartItems /> : <h1>No Result Found!</h1>}
      <div className="my-3">
        <h1>Total Price: Rs.{total.toFixed(2)}</h1>
      </div>
      <Button
        variant="danger"
        onClick={() => {
          navigate(`/details/${Number(rest_id)}`);
        }}
      >
        Back
      </Button>{" "}
      &nbsp;
      {cart.length > 0 && (
        <Button
          variant="success"
          onClick={() => {
            navigate("/placeOrder");
          }}
        >
          Proceed
        </Button>
      )}
    </div>
  );
};

export default Cart;
