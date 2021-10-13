import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSingleCoffee } from "../../store/singleCoffee";

class SingleCoffee extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.fetchCoffee();
    console.log("componenet mounted");
  }

  render() {
    console.log("props", this.props.singleCoffee);
    const { name, brandName, photoUrl, roast } = this.props.singleCoffee;
    return (
      <div className="single-coffee">
        <h2>{name}</h2>
        <h3>{brandName}</h3>
        <div className="single-coffee-container">
          <div className="single-coffee-image">
            <img src={photoUrl} />
          </div>
          <div className="single-coffee-info">
            <p>{roast}</p>
          </div>
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    singleCoffee: state.singleCoffee,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchCoffee: () => dispatch(fetchSingleCoffee()),
  };
};

export default connect(mapState, mapDispatch)(SingleCoffee);
