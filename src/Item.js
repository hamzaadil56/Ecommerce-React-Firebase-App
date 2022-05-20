import React from "react";
import { ACTIONS } from "./Store/action";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

const Item = ({ id, price, title, image, piece, item }) => {
  const dispatch = useDispatch();
  const addItem = (id) => {
    dispatch({ type: ACTIONS.ADD_ITEM, payload: id });
  };
  const subtractItem = (id) => {
    dispatch({ type: ACTIONS.SUBTRACT_ITEM, payload: id });
  };
  const removeItem = (id) => {
    dispatch({ type: ACTIONS.REMOVE_ITEM, payload: id });
  };

  return (
    <div key={id} className="cart-item mb-3">
      <div className="row g-0">
        <div className="col-md-4">
          <img
            src={image}
            className="img-fluid rounded-start cart-img"
            alt="..."
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{price}</p>
            <p>Pieces: {piece}</p>
            <button className="btn btn-light" onClick={() => addItem(id)}>
              +
            </button>
            <button className="btn btn-danger" onClick={() => subtractItem(id)}>
              -
            </button>
            <button className="btn btn-warning" onClick={() => removeItem(id)}>
              remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Item;
