import React, { Component } from "react";
import { connect } from "react-redux";

import { fetchBusinesses } from "../../../store/businessActions";

class Businesses extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.fetchBusinesses();
    console.log("businesses", this.props.businesses);
  }

  render() {
    if (this.props.businesses.businesses.length) {
      return (
        <div>
          {this.props.businesses.businesses.map((business) => (
            <div>{business.data().name} {business.id}</div>
          ))}
        </div>
      );
    } else {
      return <div>hiiii</div>;
    }
  }
}

const mapState = (state) => {
  return {
    businesses: state.businesses,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchBusinesses: () => dispatch(fetchBusinesses()),
  };
};

export default connect(mapState, mapDispatch)(Businesses);
