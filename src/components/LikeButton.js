import React, { Component } from "react";
import { connect } from "react-redux";

export class LikeButton extends Component {
  constructor() {
    super();
    this.handleLike = this.handleLike.bind(this);
  }
  handleLike() {
    console.log(this.props.user);
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
const mapState = (state) => ({
  user: state.auth.uid,
});
const mapDispatch = () => {};

export default connect(mapState, mapDispatch)(LikeButton);
