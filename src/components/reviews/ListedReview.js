import React, { Component } from "react";

class ListedReview extends Component {
  render() {
    console.log("l,istexc props", this.props);
    const { username, rating } = this.props.review;
    const content = this.props.content;
    console.log("ok now in listed review");
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

export default ListedReview;
