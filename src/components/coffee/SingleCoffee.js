import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSingleCoffee } from "../../store/singleCoffee";
import AddReview from "../reviews/AddReview";

class SingleCoffee extends Component {
  componentDidMount() {
    const id = "AHmZ4UjEsZb4atwmhPM3";
    this.props.fetchCoffee(id);
    console.log("component moutned");
  }

  render() {
    console.log("props", this.props);
    //const singleCoffee = this.props.singleCoffee;
    const id = "AHmZ4UjEsZb4atwmhPM3";
    const { name, brandName, photoUrl, roast } = this.props.singleCoffee;
    return (
      <>
        <div className="single-coffee">
          <h2>{name}</h2>
          <h3>{brandName}</h3>
          <div className="single-coffee-container">
            <div className="single-coffee-image">
              <img
                id="single-coffee-img"
                src={photoUrl}
                alt={`${name} by ${brandName}`}
              />
            </div>
            <div className="single-coffee-info">
              <p>{roast}</p>
            </div>
          </div>
          <AddReview coffeeId={id} />
        </div>
      </>
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
    fetchCoffee: (id) => dispatch(fetchSingleCoffee(id)),
  };
};

export default connect(mapState, mapDispatch)(SingleCoffee);
