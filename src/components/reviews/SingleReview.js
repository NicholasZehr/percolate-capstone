import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSingleReview } from "../../store/reviewActions";
import ReviewComment from "./ReviewComment";

class SingleReview extends Component {
  async componentDidMount() {
    const reviewId = this.props.match.params.reviewId;
    await this.props.fetchReview(reviewId);
  }

  render() {
    const { rating, comments } = this.props.review;

    return (
      <div className='single-review-container'>
        <div className='review-list-item'>
          <div className='review-user-rating'>
            <h4 id='review-username'>username</h4>
            <h4 id='review-rating'>{rating}</h4>
          </div>
          <hr className='solid' />
          <p id='content'>content</p>
        </div>
        <div className='comments-container'>
          {comments ? (
            comments.map((comment) => {
              return <ReviewComment comment={comment} />;
            })
          ) : (
            <h2>Be first to add a comment!</h2>
          )}
        </div>
      </div>
    );
  }
}
const mapState = (state) => {
  return {
    review: state.review.review,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchReview: (reviewId) => dispatch(fetchSingleReview(reviewId)),
  };
};

export default connect(mapState, mapDispatch)(SingleReview);
