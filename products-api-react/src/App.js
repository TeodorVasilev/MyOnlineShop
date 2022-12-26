import React from "react";
import { Route, Switch } from "react-router-dom";
import HomeView from "./views/home/HomeView";
import LoginView from "./views/login/LoginView";
import RegisterView from "./views/register/RegisterView";
import AccountView from "./views/account/AccountView";

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Switch>
          <Route exact path="/" component={HomeView}>
          </Route>
          <Route path="/login" component={LoginView}>
          </Route>
          <Route path="/register" component={RegisterView}>
          </Route>
          <Route path="/account" component={AccountView}>
          </Route>
      </Switch>
    );
  }
}

export default App;
