import React from "react";
import { Routes, Route } from "react-router-dom";
import TopLayout from "./layout/TopLayout";
import HomeView from "./views/home/HomeView";

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
        <Routes>
          <Route exact path="/" element={<HomeView />}>
          </Route>
        </Routes>
    );
  }
}

export default App;
