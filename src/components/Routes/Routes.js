import React, { Component } from "react";
import { Route, Switch } from "react-router";
import AllBusinesses from "../businesses/allBusinesses/AllBusinesses";
import AddReview from "../reviews/AddReview";
import LoginPage from "../loginSignup/Login";
import Signup from "../loginSignup/Signup";
import Business from "../businesses/singleBusiness/singleBusiness";
import SingleUserPage from "../user/SinglePageUser";
import SingleCoffee from "../coffee/SingleCoffee";
import ReviewPane from "../reviews/ReviewPane";
import SingleReview from "../reviews/SingleReview";
// import AllBusinesses from "./components/businesses/allBusinesses/AllBusinesses";
// import LoginPage from "./components/Login";

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/reviewPane" component={ReviewPane} />
        <Route path="/review/:reviewId" component={SingleReview} />
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={Signup} />
        <Route path="/businesses" component={AllBusinesses} />
        <Route path="/business" component={Business} />
        <Route path="/users/:id" component={SingleUserPage} />
        <Route exact path="/coffee/:coffeeId" component={SingleCoffee} />
      </Switch>
    );
  }
}

export default Routes;
