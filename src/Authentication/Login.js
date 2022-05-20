import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { connect } from "react-redux";
import {useEffect} from'react'
import { googleLogin } from "../config";
import { getOrderDetails } from "../config";
const Login = (props) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.shop);
//  useEffect(()=>{
//   props.get_data()
//  },[])
  return (
    <div>
      {state.isAuthenticated ? (
        <img className="profile-pic" src={state.currentUser.profile_pic} />
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
