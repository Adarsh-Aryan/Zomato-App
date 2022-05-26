import React, { useContext } from "react";
import { ListGroup } from "react-bootstrap";
import ZomatoContext from "../../context/ZomatoContext";
import "./CartItems.css";

import { BsFillTrashFill } from "react-icons/bs";

const CartItems = () => {
  const {
    state: { cart },
    dispatch,
  } = useContext(ZomatoContext);

  return (
    <>
      <ListGroup>
        {cart?.map((item) => {
          return (
            <ListGroup.Item key={item.menu_id}>
              <div className="row-section">
                <div className="cartItem_content">
                  <div>
                    <img src={item.menu_image} alt={item.menu_name} />
                  </div>
                  <div className="cartItem_name">
                    <span>{item.menu_name}</span>
                  </div>
                  <div>
                    <span>Rs.{(item.menu_price * item.qty).toFixed(2)}</span>
                  </div>
                </div>

                <div className="cart-operation">
                  <div>
                    <select
                      name="quantity"
                      className="quantity"
                      onChange={(e) => {
                        dispatch({
                          type: "ON_CHANGE_QUANTITY",
                          payload: {
                            id: item.menu_id,
                            qty: e.target.value,
                          },
                        });
                      }}
                    >
                      {[...Array(5)].map((_, i) => {
                        return (
                          <option value={i + 1} key={i + 1}>
                            {i + 1}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div>
                    <BsFillTrashFill
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        dispatch({
                          type: "REMOVE_FROM_CART",
                          payload: item,
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </>
  );
};

export default CartItems;
