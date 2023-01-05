import React from "react";
import { Route, Switch } from "react-router-dom";
import HomeView from "./views/home/HomeView";
import LoginView from "./views/login/LoginView";
import RegisterView from "./views/register/RegisterView";
import AccountView from "./views/account/AccountView";
import CartView from "./views/cart/CartView";
import ProductsView from "./views/products/ProductsView";
import AdminView from "./admin/views/AdminView";
import UsersView from "./admin/views/users/UsersView";
import EditUserView from "./admin/views/users/EditUserView";
import AllProductsView from "./admin/views/products/AllProductsView";
import EditProductView from "./admin/views/products/EditProductView";
import CreateProductView from "./admin/views/products/CreateProductView";

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
          <Route path="/admin/user" component={EditUserView}>
          </Route>
          <Route path="/admin/users" component={UsersView}>
          </Route>
          <Route path="/admin/product" component={EditProductView}>
          </Route>
          <Route path="/admin/products" component={AllProductsView}>
          </Route>
          <Route path="/admin/createproduct" component={CreateProductView}>
          </Route>
          <Route path="/admin" component={AdminView}>
          </Route>
      </Switch>
    );
  }
}

export default App;
