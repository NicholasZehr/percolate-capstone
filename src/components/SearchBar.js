import React, { Component } from "react";

class SearchBar extends Component {
  render() {
    return (
      <div className="search-container">
        <div className="search">
          <input className="search-input" placeholder="Find Your Beans" />
        </div>
      </div>
    );
  }
}

export default SearchBar;