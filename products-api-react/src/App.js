import React from "react";
import { Routes, Route } from "react-router-dom";
import TopLayout from "./layout/TopLayout";
import HomeView from "./views/home/HomeView";
import LoginView from "./views/login/LoginView";

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
        <Routes>
          <Route exact path="/" element={<HomeView />}>
          </Route>
          <Route path="/login" element={<LoginView/>}>
          </Route>
        </Routes>
    );
  }
}

export default App;
