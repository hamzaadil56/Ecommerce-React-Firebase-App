// Import the functions you need from the SDKs you need
import { ACTIONS } from "./Store/action";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getDatabase, ref, set, onChildAdded } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD4eCNKJx5FnUqaw3-9MkTqc5GNnLBY8qc",
  authDomain: "ecommerce-website-a03bc.firebaseapp.com",
  projectId: "ecommerce-website-a03bc",
  storageBucket: "ecommerce-website-a03bc.appspot.com",
  messagingSenderId: "255660706183",
  appId: "1:255660706183:web:9bce447eca6c8dbf63ab22",
  measurementId: "G-H71Z41FKYJ",
  databaseURL: "https://ecommerce-website-a03bc-default-rtdb.firebaseio.com",
};

const app = initializeApp(firebaseConfig);
getDatabase(app);

const googleLogin = () => {
  return (dispatch) => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    console.log(dispatch, "dispatch");
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        let user_data = {
          username: user.displayName,
          email: user.email,
          profile_pic: user.photoURL,
          uid: user.uid,
        };
        const db = getDatabase();
        set(ref(db, "users/" + user.uid), {
          username: user.displayName,
          email: user.email,
          profile_pic: user.photoURL,
          uid: user.uid,
        });
        console.log(user_data);
        dispatch({ type: ACTIONS.AUTHENTICATION, payload: user_data });
      })
      .catch((error) => {
        // Handle Errors here.
        const errorMessage = error.message;
        console.log(errorMessage);
        // The email of the user's account used.
        // The AuthCredential type that was used.
        // ...
      });
  };
};
const getUserData = () => {
  return (dispatch) => {
    const db = getDatabase();
    const usersRef = ref(db, "users/");
    onChildAdded(usersRef, (data) => {
      console.log(data.val(), "user-details");
      dispatch({ type: ACTIONS.GET_USER_DETAILS, payload: data.val() });
    });
  };
};
const getOrderDetails = () => {
  return (dispatch) => {
    const db = getDatabase();
    const usersRef = ref(db, "users/");
    onChildAdded(usersRef, (data) => {
      console.log(data.val(), "order_details");
      dispatch({ type: ACTIONS.GET_ORDER_DETAILS, payload: data.val() });
    });
  };
};
export { googleLogin, getUserData, getOrderDetails };
