import React from "react";
import { Route, Switch } from "react-router-dom";
import HomeView from "./views/home/HomeView";
import LoginView from "./views/login/LoginView";
import RegisterView from "./views/register/RegisterView";
import AccountView from "./views/account/AccountView";
import CartView from "./views/cart/CartView";
import ProductsView from "./views/products/ProductsView";

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Switch>
          <Route exact path="/" component={HomeView}>
          </Route>
          <Route path="/products" component={ProductsView}>
          </Route>
          <Route path="/login" component={LoginView}>
          </Route>
          <Route path="/register" component={RegisterView}>
          </Route>
          <Route path="/account" component={AccountView}>
          </Route>
          <Route path="/cart" component={CartView}>
          </Route>
      </Switch>
    );
  }
}

export default App;
