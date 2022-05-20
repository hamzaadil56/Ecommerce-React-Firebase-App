import React from "react";
import Navbar from "./Navbar";
import { products } from "./data";
import "./App.css";
import Items from "./Items";
import { ACTIONS } from "./Store/action";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
const Products = () => {
  const dispatch = useDispatch();
  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const allColors = ["all", ...new Set(products.map((item) => item.color))];

  const state = useSelector((state) => state.shop);

  const filterItems = (category) => {
    dispatch({ type: ACTIONS.FILTER_CATEGORY, payload: category });
  };
  const filterColors = (color) => {
    dispatch({ type: ACTIONS.FILTER_COLOR, payload: color });
  };
  const filterPrice = (e) => {
    dispatch({ type: ACTIONS.FILTER_PRICE, payload: e.target.value });
  };
  const [isOpen, setOpenFilterContainer] = useState(false);
  const filterButton = () => {
    if (isOpen === false) {
      setOpenFilterContainer(true);
    } else {
      setOpenFilterContainer(false);
    }
  };
  return (
    <div>
      <Navbar />
      {state.isAuthenticated ? (
        <div
          className="alert alert-success alert-dismissible d-flex align-items-center"
          role="alert"
        >
          <button
            data-bs-dismiss="alert"
            type="button"
            className="btn-close"
            aria-label="Close"
          ></button>
          <div>Logged In successfully!</div>
        </div>
      ) : (
        ""
      )}
      <section className="products-container">
        <div className="header">
          <h1>All the Products You Want!</h1>
        </div>
        <div className="grid-container">
          <section
            className={isOpen ? "aside section aside-open" : "aside section"}
          >
            <aside className="filter-container">
              <button
                onClick={() => filterButton()}
                className="btn btn-warning  close-btn"
              >
                Close
              </button>
              <div className="filter-boxes">
                <form onSubmit={(e) => e.preventDefault()} action="">
                  <input
                    onChange={(e) => {
                      dispatch({
                        type: ACTIONS.SEARCH,
                        payload: e.target.value,
                      });
                    }}
                    type="search"
                    name="search"
                    id="search-box"
                    placeholder="Search"
                  />
                </form>
              </div>
              <div className="filter-boxes">
                <h5>Category</h5>
                {state.allCategories.map((category, index) => {
                  return (
                    <button
                      key={index}
                      onClick={() => filterItems(category)}
                      className="btn btn-transparent filter-btn"
                    >
                      {capitalize(category)}
                    </button>
                  );
                })}
              </div>
              <div className="filter-boxes">
                <h5>Color</h5>

                {allColors.map((color, index) => {
                  return (
                    <button
                      key={index}
                      onClick={() => filterColors(color)}
                      className={color === "all" ? "btn" : "btn color-btn"}
                      style={color === "all" ? {} : { backgroundColor: color }}
                    >
                      {color === "all" ? capitalize(color) : ""}
                    </button>
                  );
                })}
              </div>
              <div className="filter-boxes">
                <h5>Price</h5>
                <input
                  type="range"
                  min={state.minValue}
                  max={state.maxValue}
                  value={state.initialValue}
                  className="range-slider"
                  onChange={(e) => filterPrice(e)}
                />
                <p>{state.initialValue}</p>
              </div>
            </aside>
          </section>

          <Items filterButton={filterButton} products={state.shopItems} />
        </div>
      </section>
      <div className="container">
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
          <div className="col-md-4 d-flex align-items-center">
            <span className="text-muted">© 2021 Company, Inc</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Products;
