import React, { Component } from "react";
import LikeButton from "../LikeButton";

class ListedReview extends Component {
  render() {
    console.log("l,istexc props", this.props);
    const { username, rating } = this.props.review;
    const content = this.props.content;
    console.log("ok now in listed review", this.props.review);
    return (
      <div className='review-list-item'>
        <div className='review-user-rating'>
          <h4 id='review-username'>Username {username} </h4>
          <h4 id='review-rating'>Rating {rating}</h4>
          <LikeButton
            reviewId={this.props.review.reviewId}
            key={this.props.review.reviewId}
            likeCount={this.props.review.likeCount}
          />
        </div>
        <hr className='solid' />
        <p id='content'>{content}</p>
      </div>
    );
  }
}

export default ListedReview;
