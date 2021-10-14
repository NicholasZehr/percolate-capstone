import React, { Component } from "react";
import { Route, Switch } from "react-router";
import AllBusinesses from "../businesses/allBusinesses/AllBusinesses";
import SingleCoffee from "../coffee/SingleCoffee";
import LoginPage from "../Login";
import Navbar from "../Navbar";
import Signup from "../Signup";
// import AllBusinesses from "./components/businesses/allBusinesses/AllBusinesses";
// import LoginPage from "./components/Login";

class Routes extends Component {
  render() {
    return (
      <>
        <Navbar />
        <Switch>
          <Route path="/all-business" component={AllBusinesses} />
          <Route path="/coffees/singleCoffee" component={SingleCoffee} />
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={Signup} />
          <Route path="/all-business" component={AllBusinesses} />
        </Switch>
      </>
    );
  }
}

export default Routes;
