import React, { Component } from "react";
import { connect } from "react-redux";

import { fetchBusinesses } from "../../../store/businessActions";


const Businesses = (props) => {
  return ( 
      props.businesses.businesses.length ? (
          <div>
            {this.props.businesses.businesses.map((business) => (
              <div>
                {business.data().name} {business.id}
              </div>
            ))}
          </div>
        )
      : (<div>No bussineses to display.</div> )
  )
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
