import React, { Component } from "react";
import { connect } from "react-redux";
import { likeClick } from "../../store/reviewActions";
import ListedReview from "./ListedReview";

class ReviewPane extends Component {
  constructor(props) {
    super(props);
    this.checkReview = this.checkReview.bind(this);
  }

  checkReview(content) {
    let revWords = content.split(" ");
    const length = revWords.length;
    let newReview = "";
    if (length >= 10) {
      newReview = revWords.slice(0, 5).join(" ").concat(" More...");
      return newReview;
    }
    return content;
  }

  render() {
    const { checkReview } = this;
    const coffeeId = this.props.coffeeId;

    const arrReviews = this.props.reviews
      ? Object.entries(this.props.reviews)
      : false;
    // const reviewArr = this.props.reviews.reviews;
    return (
      <div>
        <h2>Reviews</h2>
        {arrReviews
          ? arrReviews.map((review, idx) => {
              //checkReview(review.content);
              return (
                <ListedReview
                  coffeeId={coffeeId}
                  key={review[0]}
                  content={checkReview(review[1].content)}
                  review={review[1]}
                />
              );
            })
          : null}
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
