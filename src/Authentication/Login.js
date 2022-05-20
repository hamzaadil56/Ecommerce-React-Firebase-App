import React from "react";
import { useSelector } from "react-redux";
import { connect } from "react-redux";
import { googleLogin } from "../config";
const Login = (props) => {
  const state = useSelector((state) => state.shop);

  return (
    <div>
      {state.isAuthenticated ? (
        <img
          className="profile-pic"
          src={state.currentUser.profile_pic}
          alt={state.currentUser.username}
        />
      ) : (
        <button
          className="btn btn-warning"
          onClick={() => {
            props.googleLogin();
          }}
        >
          Login
        </button>
      )}
    </div>
  );
};
const mapDispatchToProp = (dispatch) => ({
  googleLogin: () => dispatch(googleLogin()),
  // get_data: () => dispatch(get_data()),
});

export default connect(null, mapDispatchToProp)(Login);
