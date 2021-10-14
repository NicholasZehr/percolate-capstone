import React, { Component } from "react";
import { Route, Switch } from "react-router";
import AllBusinesses from "../businesses/allBusinesses/AllBusinesses";
import Business from "../businesses/singleBusiness/singleBusiness"
import LoginPage from "../Login";
import Signup from '../Signup';
// import AllBusinesses from "./components/businesses/allBusinesses/AllBusinesses";
// import LoginPage from "./components/Login";

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route path='/login' component={LoginPage} />
        <Route path='/signup' component={Signup} />
        <Route path='/all-business' component={AllBusinesses} />
        <Route path='/singleBusiness' component={Business} />
      </Switch>
    );
  }
}

export default Routes;
