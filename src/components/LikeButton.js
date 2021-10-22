import React, { Component } from "react";
import { connect } from "react-redux";
import { likeClick } from "../store/reviewActions";
import { getAuth } from "firebase/auth";

const auth = getAuth();
class LikeButton extends Component {
  constructor(props) {
    super(props);
    this.state = { user: auth.currentUser };
    this.handleLike = this.handleLike.bind(this);
  }
  handleLike() {
    const likeClick = this.props.likeClick;
    const id = this.props.id;
    const type = this.props.type;
    const { uid, displayName, photoURL } = this.state.user;
    likeClick(id, this.props.reviewId, uid, displayName, photoURL, type);
  }
  render() {
    const likeCount = this.props.likeCount;
    const { handleLike } = this;
    return `${likeCount}` ? (
      <div className="like_button" onClick={handleLike}>
        Like {likeCount ? `(${likeCount})` : null}
      </div>
    ) : null;
  }
}
const mapState = (state) => {
  return {
    loggedInPerson: state.auth,
  };
};
const mapDispatch = (dispatch) => ({
  likeClick: (coffeeId, reviewId, userId, displayName, photoURL, index) =>
    dispatch(
      likeClick(coffeeId, reviewId, userId, displayName, photoURL, index)
    ),
});

export default connect(mapState, mapDispatch)(LikeButton);
