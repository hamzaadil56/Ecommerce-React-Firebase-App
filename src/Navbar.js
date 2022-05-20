import "./App.css";
import React from "react";
import { BsFillCartFill } from "react-icons/bs";
import "./App.css";
import Login from "./Authentication/Login";
import { links } from "./data";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserData } from "./config";
import { connect } from "react-redux";
import { useEffect } from "react";

const Navbar = (props) => {
  useEffect(() => {
    props.getUserData();
  }, []);
  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const state = useSelector((state) => state.shop);
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark ">
        <div className="navbar-container container-fluid">
          <a className="navbar-brand" href="#">
            FashionVilla
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="navbar-items collapse navbar-collapse" id="navbarNav">
            <ul className="me-auto navbar-nav">
              {links.map((link, index) => {
                return (
                  <li key={index} className="nav-item">
                    <Link
                      className="nav-link"
                      to={link === "home" ? "/" : `/${link}`}
                    >
                      {capitalize(link)}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="cart-container">
              <button
                className="cart-btn position-relative "
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasRight"
                aria-controls="offcanvasRight"
              >
                <BsFillCartFill style={{ fontSize: "30px", color: "white" }} />
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {state.totalItems}
                </span>
              </button>
            </div>
            <Login />
            {/* <button onClick={() => googleLogin()} className="btn btn-warning">
              Login
            </button> */}
          </div>
        </div>
      </nav>
    </div>
  );
};
const mapDispatchToProp = (dispatch) => ({
  getUserData: () => dispatch(getUserData()),
});

export default connect(null, mapDispatchToProp)(Navbar);
