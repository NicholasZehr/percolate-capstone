import React, { Component } from "react";

class ListedReview extends Component {
  render() {
    console.log("l,istexc props", this.props);
    const { userName, rating, content } = this.props.review;

    return (
      <div>
        <div className="review-user-rating">
          <h4>{userName}</h4>
          <h4>{rating}</h4>
        </div>
        <p>{content}</p>
      </div>
    );
  }
}

export default ListedReview;
