import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Loader from "../../images/loader.gif";

const ViewOrders = () => {
  const [orders, setOrders] = useState();

  const fetchOrders = async () => {
    const response = await fetch(
      "https://zomato-villa-api.herokuapp.com/orders",
      {
        method: "GET",
        headers: {
          "auth-token": sessionStorage.getItem("auth-token"),
        },
      }
    );

    const data = await response.json();
    setOrders(data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (!sessionStorage.getItem("auth-token")) {
    return window.location.replace("/auth");
  }

  if (!orders) {
    return (
      <div style={{ margin: "6rem auto", width: "80%" }}>
        <img src={Loader} alt="loader" />
      </div>
    );
  }

  if (orders?.length === 0) {
    return (
      <div style={{ margin: "6rem auto", width: "80%" }}>
        <h1 style={{ color: "red" }}>No Orders Found!</h1>
        <Link to="/" className="btn btn-info">
          Order Something!
        </Link>
      </div>
    );
  }

  return (
    <div style={{ margin: "6rem 2rem" }}>
      <h3>Orders</h3>
      <table className="table">
        <thead>
          <tr>
            <th>OrderId</th>
            <th>RestaurantName</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Cost</th>
            <th>TXN_Date</th>
            <th>Status</th>
            <th>BankName</th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((item) => {
            return (
              <tr key={item._id}>
                <th>{item._id}</th>
                <th>{item.rest_name}</th>
                <th>{item.name}</th>
                <th>{item.phone}</th>
                <th>Rs.{item.cost}</th>
                <th>{item.txnDate?.split(" ")[0]} </th>
                <th
                  style={{
                    color: item.status === "TXN_SUCCESS" ? "green" : "red",
                  }}
                >
                  {item.status}
                </th>
                <th>{item.bankName}</th>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          className="btn btn-primary"
          onClick={() => {
            window.location = "/";
          }}
        >
          CONTINUE ORDER
        </button>
      </div>
    </div>
  );
};

export default ViewOrders;
