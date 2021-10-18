import React, { Component } from "react";
import { connect } from "react-redux";
import { likeClick } from "../../store/reviewActions";
import ListedReview from "./ListedReview";

class ReviewPane extends Component {
  constructor(props) {
    super(props);
    this.checkReview = this.checkReview.bind(this);
  }

  componentDidMount() {
    console.log("I mounted!!!");
    // const type = this.props.type;
    // const id = this.props.coffeeId;
    console.log("reviewzzz", this.props.coffeeReviews);
    //this.props.fetchReviews(type, id);
  }

  checkReview(review) {
    let revWords = review.split(" ");
    console.log("first set", revWords);
    const length = revWords.length;
    console.log("length", length);
    let newReview = "";
    if (length >= 10) {
      newReview = revWords.slice(0, 5).join(" ").concat(" More...");
      console.log("n4ew", newReview);
      return newReview;
    }
    return review;
  }

  render() {
    const { checkReview } = this;
    console.log("here they are123", this.props.arrReviews);
    const arrReviews = this.props.arrReviews;
    // const reviewArr = this.props.reviews.reviews;
    if (!arrReviews) return null;
    return (
      <div>
        <h2>Reviews</h2>
        {arrReviews.map((review) => {
          //checkReview(review.content);
          console.log("this one review", review);
          return (
            <ListedReview
              key={review.reviewId}
              content={checkReview(review.content)}
              review={review}
            />
          );
        })}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    reviews: state.review.reviews,
  };
};
const mapDispatch = (dispatch) => ({
  fetchReviews: (type, id) => dispatch(likeClick(type, id)),
});

export default connect(mapState, mapDispatch)(ReviewPane);
