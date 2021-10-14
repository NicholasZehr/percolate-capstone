import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import NavProfile from "./NavProfile";
import SearchBar from "./SearchBar";

class Navbar extends Component {
  render() {
    return (
      <div className="navbar">
        <div className="logo-container">
          <Link id="logo" to="/home">
            percolate
          </Link>
        </div>
        <SearchBar />
        <NavProfile />
      </div>
    );
  }
}

export default Navbar;
