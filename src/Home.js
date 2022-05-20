import React from "react";
import Crousel from "./Crousel";
import { featured_products } from "./data";
import Navbar from "./Navbar";
import Item from "./CartItem";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Home = () => {
  const history = useHistory();
  const state = useSelector((state) => state.shop);
  return (
    <div>
      <Navbar />

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
                <button className="btn btn-danger">Proceed to Checkout</button>
              ) : (
                <button className="btn btn-warning">
                  Login to Proceed to Checkout
                </button>
              )}
            </div>
          )}
        </div>
        <h2>Total Price:{state.totalPrice} </h2>
      </div>
      <Crousel />
      <section className="container-md featured-products">
        <h1>Featured Products</h1>
        <div className="underline"></div>
        <section className="grid-section">
          {featured_products.map((item, index) => {
            return (
              <div key={index} className="card ">
                <div className="overlay"></div>
                <img src={item.image} className="card-img-top" />
                <div className="card-body">
                  <h4>{item.title}</h4>
                  <p className="card-text">{item.price}</p>
                </div>
              </div>
            );
          })}
        </section>
        <button
          onClick={() => history.push("/products")}
          className="btn btn-dark all-products-btn"
        >
          All Products
        </button>
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

export default Home;
