import React, { Component } from "react";
import { Route, Switch } from "react-router";
import AllBusinesses from "../businesses/allBusinesses/AllBusinesses";
import SingleCoffee from "../coffee/SingleCoffee";
import LoginPage from "../Login";
// import AllBusinesses from "./components/businesses/allBusinesses/AllBusinesses";
// import LoginPage from "./components/Login";

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/all-business" component={AllBusinesses} />
        <Route path="/coffees/singleCoffee" component={SingleCoffee} />
      </Switch>
    );
  }
}

export default Routes;
