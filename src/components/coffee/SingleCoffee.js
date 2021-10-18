import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSingleCoffee } from "../../store/singleCoffee";
import AddReview from "../reviews/AddReview";
import ReviewPane from "../reviews/ReviewPane";

class SingleCoffee extends Component {
  componentDidMount() {
    //const id = "AHmZ4UjEsZb4atwmhPM3";
    const id = this.props.match.params.coffeeId;
    this.props.fetchCoffee(id);
    console.log("component moutned");
  }

  render() {
    //console.log("props matching!!", this.props.match);
    //const singleCoffee = this.props.singleCoffee;
    console.log("COFFEE PROPS", this.props.singleCoffee.reviews);
    const id = this.props.match.params.coffeeId;
    const {
      name,
      brandName,
      photoUrl,
      roast,
      roasterCity,
      avgRating,
      reviews,
    } = this.props.singleCoffee;

    console.log('here they are', reviews)
    return (
      <>
        <div className="single-coffee">
          <div className="single-coffee-container">
            <div className="coffee-title">
              <h2>{name}</h2>
              <h3>{brandName}</h3>
              <hr class="solid" />
            </div>
            <div className="image-details-row">
              <div className="single-coffee-image">
                <img
                  id="single-coffee-img"
                  src={photoUrl}
                  alt={`${name} by ${brandName}`}
                />
              </div>
              <div className="single-coffee-info">
                <p>Roast: {roast}</p>
                <p>Roasted in {roasterCity}</p>
                <p>User Rating: {avgRating}</p>
              </div>
            </div>
          </div>
          <AddReview coffeeId={id} />
          <ReviewPane type="coffee" coffeeId={id} arrReviews={reviews} />
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
