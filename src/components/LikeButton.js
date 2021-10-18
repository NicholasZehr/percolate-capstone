import React, { Component } from "react";
import { connect } from "react-redux";
import { likeClick } from "../store/reviewActions";

class LikeButton extends Component {
  constructor() {
    super();
    this.handleLike = this.handleLike.bind(this);
  }
  handleLike() {
    console.log("Used handle click", this.props.reviewId, this.props);
    likeClick(this.props.reviewId, this.props.loggedInPerson);
  }
  render() {
    const likeCount = this.props.likeCount;
    const { handleLike } = this;
    return `${likeCount}` ? (
      <div className='like_button' onClick={handleLike}>
        Like {likeCount ? `(${likeCount})` : null}
      </div>
    ) : null;
  }
}
const mapState = (state) => {
  console.log("This is state.auth", state.auth);
  return {
    loggedInPerson: state.auth,
  };
};
const mapDispatch = (dispatch) => ({
  likeClick: (reviewId, userId) => dispatch(likeClick(reviewId, userId)),
});

export default connect(mapState, mapDispatch)(LikeButton);
