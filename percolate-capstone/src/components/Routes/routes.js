import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch, withRouter } from "react-router-dom";
import AllBusinesses from "../businesses/allBusinesses/AllBusinesses";
import LoginPage from "../Login";

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route path="/all-business" component={AllBusinesses} />
        <Route path="/login" component={LoginPage} />
      </Switch>
    );
  }
}

export default Routes;
