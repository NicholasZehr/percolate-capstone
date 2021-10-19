import React, { Component } from "react";
import { connect } from "react-redux";
import { likeClick } from "../../store/reviewActions";
import ListedReview from "./ListedReview";

class ReviewPane extends Component {
  constructor(props) {
    super(props);
    this.checkReview = this.checkReview.bind(this);
  }

  checkReview(review) {
    let revWords = review.split(" ");
    const length = revWords.length;
    let newReview = "";
    if (length >= 10) {
      newReview = revWords.slice(0, 5).join(" ").concat(" More...");
      return newReview;
    }
    return review;
  }

  render() {
    const { checkReview } = this;
    const arrReviews = this.props.arrReviews;
    // const reviewArr = this.props.reviews.reviews;
    if (!arrReviews) return null;
    return (
      <div>
        <h2>Reviews</h2>
        {arrReviews.map((review, idx) => {
          //checkReview(review.content);
          return (
            <ListedReview
              idx={idx}
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
