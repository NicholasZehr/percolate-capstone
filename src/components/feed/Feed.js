import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchFeedReviews } from "../../store/feed";

import { getAuth } from "firebase/auth";
// const auth = getAuth();
// const user = auth.currentUser;
class Feed extends Component {
  constructor() {
    super();
    const auth = getAuth();
    this.state = { user: auth.currentUser };
  }

  componentDidMount() {
    // const user = this.state.user;
    // console.log("user", user.uid);
    // this.props.fetchFeed(user.uid);
  }

  render() {
    console.log("feed props", this.props.feed);
    return (
      <div>
        <h1>this is the feed component</h1>
      </div>
    );
  }
}
const mapState = (state) => {
  return {
    feed: state.feed,
  };
};
const mapDispatch = (dispatch) => {
  return {
    fetchFeed: (me) => dispatch(fetchFeedReviews(me)),
  };
};
export default connect(mapState, mapDispatch)(Feed);
