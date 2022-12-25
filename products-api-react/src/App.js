import React from "react";
import { Route, Switch } from "react-router-dom";
import HomeView from "./views/home/HomeView";
import LoginView from "./views/login/LoginView";

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
      </Switch>
    );
  }
}

export default App;
