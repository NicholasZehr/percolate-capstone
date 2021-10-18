import React, { Component } from "react";
import { Link } from "react-router-dom";

class ListedReview extends Component {
  render() {
    const { username, rating, reviewId } = this.props.review;
    const content = this.props.content;

    return (
      <>
        <div className="review-list-item">
          <div className="review-user-rating">
            <h4 id="review-username">{username}</h4>
            <h4 id="review-rating">{rating}</h4>
          </div>
          <hr class="solid" />
          <Link to={`/review/${reviewId}`}>
            <p id="content">{content}</p>
          </Link>
        </div>
      </>
    );
  }
}

export default ListedReview;
