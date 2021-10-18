import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSingleReview } from "../../store/reviewActions";

class SingleReview extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const reviewId = this.props.match.params.reviewId;
    this.props.fetchReview(reviewId);
  }

  render() {
    const { username, content, rating } = this.props.review;
    return (
      <div className="review-list-item">
        <div className="review-user-rating">
          <h4 id="review-username">{username}</h4>
          <h4 id="review-rating">{rating}</h4>
        </div>
        <hr class="solid" />
        <p id="content">{content}</p>
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
