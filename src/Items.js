import React from "react";
import { ACTIONS } from "./Store/action";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Item from "./CartItem";
import Login from "./Authentication/Login";
import { useHistory } from "react-router-dom";
const Items = ({ products, colorItems, filterButton }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.shop);
  const addToCart = (id) => {
    dispatch({ type: ACTIONS.ADD_TO_CART, payload: id });
    dispatch({ type: ACTIONS.ADD_ITEM, payload: id });
  };
  useEffect(() => {
    dispatch({ type: ACTIONS.GET_TOTAL_ITEMS });
  }, [state.cartItems]);

  return (
    <div>
      <article>
        <p>
          {products.length} products found
          <hr />
        </p>
        <button
          onClick={() => filterButton()}
          className="btn filter-dropdown btn-primary"
        >
          Filter
        </button>
        {/* <label>
          Sort by:
          <select defaultValue="lowest" name="sort" id="sort">
            <option
              value="highest"
              onSelect={(e) => {
                e.target.selected = true;
                console.log("select hogya hai");
                dispatch({ type: ACTIONS.SORT_BY_HIGHEST });
              }}
            >
              Price(Highest)
            </option>
            <option
              value="lowest"
              onSelect={() => {
                dispatch({ type: ACTIONS.SORT_BY_LOWEST });
              }}
            >
              Price(Lowest)
            </option>
            <option value="">A-Z</option>
            <option value="">Z-A</option>
          </select>
        </label> */}
        <form>
          {" "}
          <select
            onChange={(e) => {
              dispatch({
                type: ACTIONS.SORT_BY_HIGHEST,
                payload: e.target.value,
              });
              console.log(e.target.value);
            }}
            name="sort"
            id="sort"
            className="sort-input"
          >
            {" "}
            <option value="" disabled selected>
              Sort By
            </option>
            <option value="lowest">price (lowest)</option>
            <option value="highest">price (highest)</option>
            <option value="asc">name (a - z)</option>
            <option value="dsc">name (z - a)</option>
          </select>
        </form>
      </article>
      <section className="grid-section products-box">
        {products.length ? (
          products.map((item, index) => {
            return (
              <div key={index} className="card ">
                <img src={item.image} className="card-img-top" />
                <div className="card-body">
                  <h4>{item.title}</h4>
                  <p className="card-text">Price:{item.price} Rs</p>
                  <button
                    onClick={() => addToCart(item.id)}
                    className="btn btn-warning"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasRight"
                    aria-controls="offcanvasRight"
                  >
                    Add To Cart
                  </button>

                  <div
                    className="offcanvas offcanvas-end"
                    tabIndex="-1"
                    id="offcanvasRight"
                    aria-labelledby="offcanvasRightLabel"
                  >
                    <div className="offcanvas-header">
                      <h5 id="offcanvasRightLabel">Your Cart</h5>
                      <button
                        type="button"
                        className="btn-close text-reset"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="offcanvas-body">
                      {state.cartItems.length === 0 ? (
                        <div>
                          <h3>Your Cart is empty</h3>
                        </div>
                      ) : (
                        <div>
                          {state.cartItems.map((item) => {
                            return <Item key={item.id} {...item} item={item} />;
                          })}
                          {state.isAuthenticated ? (
                            <button
                              onClick={() => history.push("/checkout")}
                              className="btn btn-danger "
                              aria-label="Close"
                              data-bs-dismiss="offcanvas"
                            >
                              Proceed to Checkout
                            </button>
                          ) : (
                            <Login />
                          )}
                        </div>
                      )}
                    </div>
                    <h2>Total Price:{state.totalPrice} </h2>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <h2>Sorry no items found</h2>
        )}
      </section>
    </div>
  );
};

export default Items;
