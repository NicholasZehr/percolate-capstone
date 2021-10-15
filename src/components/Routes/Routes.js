import React, { Component } from "react";
import { Route, Switch } from "react-router";
import AllBusinesses from "../businesses/allBusinesses/AllBusinesses";
import AddReview from "../reviews/AddReview";
import LoginPage from "../loginSignup/Login";
import Signup from "../loginSignup/Signup";
import Business from "../businesses/singleBusiness/singleBusiness";
import SingleUserPage from "../user/SinglePageUser";

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route path='/login' component={LoginPage} />
        <Route path='/signup' component={Signup} />
        <Route path='/all-business' component={AllBusinesses} />
        <Route path='/singleBusiness' component={Business} />
        <Route path='/users/:id' component={SingleUserPage} />
        <Route exact path='/review/add' component={AddReview} />
      </Switch>
    );
  }
}

export default Routes;
