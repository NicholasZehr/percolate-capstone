import React, { Component } from "react";
import { connect } from "react-redux";
import { likeClick } from "../store/reviewActions";
import { getAuth } from "firebase/auth";
const auth = getAuth();
class LikeButton extends Component {
  constructor(props) {
    super(props);
    this.state = { user: auth.currentUser, likeStatus: 0 };
    this.handleLike = this.handleLike.bind(this);
  }

  async componentWillUnmount() {
    const likeClick = this.props.likeClick;
    const id = this.props.id;
    const type = this.props.type;
    const { uid, displayName, photoURL } = this.state.user;
    if (this.state.likeStatus) {
      likeClick(id, this.props.reviewId, uid, displayName, photoURL, type);
    }
  }
  handleLike() {
    if (this.state.likeStatus) {
      this.setState({ ...this.state, likeStatus: 1 });
    }
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
