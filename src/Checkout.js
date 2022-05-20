import React from "react";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import { getDatabase, ref, set } from "firebase/database";
import { useEffect } from "react";
import { getOrderDetails } from "./config";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

const Checkout = (props) => {
  const history = useHistory();

  const clearForm = () => {
    document.getElementById("myForm").reset();
  };

  const state = useSelector((state) => state.shop);
  console.log(state);

  useEffect(() => {
    props.getOrderDetails();
  }, [props]);

  return (
    <div>
      <Navbar />
      <h1 className="heading1">Checkout</h1>
      <div>
        <div className="container checkout-box">
          {/* <h2>Total Items:{state.totalItems}</h2> */}
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Items</th>
                <th scope="col">Image</th>

                <th scope="col">Pieces</th>
                <th scope="col">Price</th>
              </tr>
            </thead>
            <tbody>
              {state.cartItems.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index}</td>
                    <td>{item.title}</td>
                    <td>
                      <img
                        className="profile-pic"
                        width="50px"
                        src={item.image}
                        alt={item.title}
                      />
                    </td>
                    <td>{item.piece}</td>
                    <td>{item.price}</td>
                  </tr>
                );
              })}
              <tr>
                <td></td>
                <td></td>
                <td>Total Items</td>
                <td>
                  <b>{state.totalItems}</b>
                </td>
                <td>
                  Cost:<b>{state.totalPrice}Rs</b>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="container checkout-box">
          <h3>Payment Method : CASH ON DELIVERY</h3>
          <form
            id="myForm"
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="row g-3"
          >
            <div className="row g-3">
              <div className="col">
                <input
                  onChange={(e) => {
                    console.log(e.target.value);
                    state.order_details.first_name = e.target.value;
                  }}
                  type="text"
                  className="form-control"
                  placeholder="First name"
                  aria-label="First name"
                  required
                />
              </div>
              <div className="col">
                <input
                  onChange={(e) => {
                    console.log(e.target.value);
                    state.order_details.last_name = e.target.value;
                  }}
                  type="text"
                  className="form-control"
                  placeholder="Last name"
                  aria-label="Last name"
                  required
                />
              </div>
            </div>

            <div className="col-md-6">
              <label htmlFor="inputEmail4" className="form-label">
                Email
              </label>
              <input
                onChange={(e) => {
                  console.log(e.target.value);
                  state.order_details.email = e.target.value;
                }}
                type="email"
                className="form-control"
                id="inputEmail4"
                placeholder="name@example.com"
                required
              />
            </div>

            <div className="col-12">
              <label htmlFor="inputAddress" className="form-label">
                Address
              </label>
              <input
                onChange={(e) => {
                  console.log(e.target.value);
                  state.order_details.address = e.target.value;
                }}
                type="text"
                className="form-control"
                id="inputAddress"
                placeholder="1234 Main St"
              />
            </div>
            <div className="col-12">
              <label htmlFor="inputAddress2" className="form-label">
                Address 2
              </label>
              <input
                type="text"
                className="form-control"
                id="inputAddress2"
                placeholder="Apartment, studio, or floor"
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputCity" className="form-label">
                City
              </label>
              <input
                type="text"
                onChange={(e) => {
                  console.log(e.target.value);
                  state.order_details.city = e.target.value;
                }}
                className="form-control"
                id="inputCity"
              />
            </div>

            <div className="col-md-2"></div>
            <div className="col-12">
              <h5 style={{ color: "red" }}>Total: {state.totalPrice}</h5>
            </div>
            <div className="col-12">
              <button
                onClick={() => {
                  state.order_details.totalItems = state.totalItems;
                  state.order_details.totalPrice = state.totalPrice;
                  const db = getDatabase();
                  set(ref(db, "users/" + state.currentUser.uid), {
                    user_data: state.currentUser,
                    order_details: state.order_details,
                  });
                  history.push("/order-confirmed");
                  clearForm();
                }}
                type="submit"
                className="btn btn-danger"
              >
                Proceed to Pay
              </button>
            </div>
          </form>
        </div>
      </div>
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
const mapDispatchToProp = (dispatch) => ({
  getOrderDetails: () => dispatch(getOrderDetails()),
});

export default connect(null, mapDispatchToProp)(Checkout);
