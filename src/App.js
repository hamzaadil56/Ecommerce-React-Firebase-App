import Home from "./Home";
import Products from "./Products";
import Checkout from "./Checkout";
import About from "./About";
import OrderConfirmed from "./Order_Confirmed";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/products">
            <Products />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/checkout">
            <Checkout />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/order-confirmed">
            <OrderConfirmed />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
