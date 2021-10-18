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
    const { handleLike } = this;
    return `${this.props.likeCount}` ? (
      <div className='like_button' onClick={handleLike}>
        Likes{`(${this.props.likes})`}
      </div>
    ) : null;
  }
}
const mapState = (state) => ({
  user: state.auth.uid,
});
const mapDispatch = () => {};

export default connect(mapState, mapDispatch)(LikeButton);
