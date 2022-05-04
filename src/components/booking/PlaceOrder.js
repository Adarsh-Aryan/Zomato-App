import React, { useState, useContext, useEffect, useRef } from 'react';
import { Spinner } from 'react-bootstrap';

import ZomatoContext from '../../context/ZomatoContext';
import './PlaceOrder.css';

const PlaceOrder = () => {
  const [total, setTotal] = useState(0);

  const [loading, setLoading] = useState(false);

  const phoneRef = useRef();
  const addressRef = useRef();

  const {
    state: { cart },
    dispatch,
  } = useContext(ZomatoContext);

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

  if (!sessionStorage.getItem('auth-token')) {
    return window.location.replace('/auth');
  }

  const userInfo = JSON.parse(sessionStorage.userInfo);

  const orderSubmitHandler = async () => {
    const phoneValue = phoneRef.current.value;
    const addressValue = addressRef.current.value;

    let orderData = {
      id: Math.floor(Math.random() * 100000),
      email: userInfo.email,
      name: userInfo.name,
      rest_name: sessionStorage.getItem('restaurantName'),
      phone: phoneValue,
      address: addressValue,
      cost: total,
      status: 'Pending',
      menuItem: cart,
    };
    setLoading(true);

    const response = await fetch(
      'https://zomato-villa-api.herokuapp.com/placeOrder',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      }
    );

    if (response.ok) {
      setLoading(false);

      console.log('order-taken');
      dispatch({
        type: 'CLEAR_CART',
      });
      sessionStorage.removeItem('userCart');
      sessionStorage.removeItem('restaurantName');
      sessionStorage.removeItem('restaurantId');

      // const transaction =await fetch('http://localhost:4100/paynow',{
      //     method:'POST',
      //     headers:{
      //         'Content-Type':'application/json'
      //     },
      //     body:JSON.stringify(orderData)
      // })

      // console.log(transaction)
    }
  };

  return (
    <section className="order">
      <h1>Orders Details</h1>
      <form
        className="form"
        action="http://localhost:4100/paynow"
        method="POST"
      >
        <input type="hidden" name="cost" value={total} />
        <input
          type="hidden"
          name="id"
          value={Math.floor(Math.random() * 100000)}
        />
        <input
          type="hidden"
          name="rest_name"
          value={sessionStorage.getItem('restaurantName')}
        />

        <div className="controls">
          <div className="control">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={userInfo.email}
              readOnly
              placeholder="Example-john@gmail.com"
            />
          </div>
          <div className="control">
            <label htmlFor="name">Name</label>
            <input type="text" name="name" value={userInfo.name} readOnly />
          </div>
        </div>
        <div className="control">
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            ref={phoneRef}
            name="phone"
            required
            placeholder="9999999999"
          />
        </div>
        <div className="control">
          <label htmlFor="address">Address</label>
          <textarea
            name="address"
            ref={addressRef}
            id="address"
            rows="8"
          ></textarea>
        </div>
        <div className="user-action">
          <h2>Total Cost: Rs {total}</h2>

          <div className="actions">
            {total > 0 ? (
              <button onClick={orderSubmitHandler}>
                {loading ? (
                  <Spinner animation="border" variant="light" />
                ) : (
                  'Submit'
                )}
              </button>
            ) : (
              <span>Please Order Something!</span>
            )}
          </div>
        </div>
      </form>
    </section>
  );
};

export default PlaceOrder;
