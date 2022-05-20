import "./App.css";
import React from "react";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";

const  OrderConfirmed =()=>{
 const state = useSelector((state)=>state.shop)
  console.log(state)
return (<>
    <Navbar/>
    <section className="container-sm">
    <h3>
        Congratulations {state.currentUser.username}!
    </h3>
        <p>Your order has been placed!</p> 
    <div className="">
    <h2>
        Order Details
        
    </h2>
    <div className="checkout-box">
    <table className="table table-hover table-success">

  
  <tbody>
    <tr>
      <th>Name</th>
      <td>{state.order_details.first_name} {state.order_details.first_name}</td>
      
    </tr>
    <tr>
      <th>Address</th>
      <td>{state.order_details.address}</td>
      
    </tr>
    <tr>
      <th>Total Items</th>
      <td>{state.order_details.totalItems}</td>

    </tr>
    <tr>
      <th>Total Price</th>
      <td>{state.order_details.totalPrice}Rs</td>

    </tr>
  </tbody>
</table>
</div>
    </div>

    </section>
    
</>)
    
}
export default OrderConfirmed;