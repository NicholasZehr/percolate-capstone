import React, { Component } from "react";
import LikeButton from "../LikeButton";
import { Link } from "react-router-dom";

class ListedReview extends Component {
  render() {
    const { displayName, rating, likeCount } = this.props.review;
    const reviewId = this.props.reviewId;
    const content = this.props.content;
    return (
      <div className="review-list-item">
        <div className="review-details">
          <Link to={`/review/${reviewId}`}>
            <div className="review-info">
              <div className="review-single-detail">
                <h4 id="review-username"> Author:{displayName} </h4>
              </div>
              <div className="review-single-detail">
                <h4 id="review-rating">Rating {rating}</h4>
                <div className="review-single-detail"></div>
                <h4 id="review-likeCount">Likes {likeCount}</h4>
              </div>
            </div>
          </Link>
          <LikeButton
            id={this.props.id}
            index={this.props.idx}
            reviewId={reviewId}
            key={this.props.review.reviewId}
            likeCount={this.props.review.likeCount}
            type={this.props.type}
          />
        </div>
        <hr className="solid" />
        <p className="review-content">{content}</p>
      </div>
    );
  }
}

export default ListedReview;
