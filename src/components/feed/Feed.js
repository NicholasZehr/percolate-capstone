import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchFeedReviews } from "../../store/feed";

import { getAuth } from "firebase/auth";
const auth = getAuth();
class Feed extends Component {
  constructor() {
    super();
    // this.state = { user: auth.currentUser };
  }
  componentDidMount() {
    const user = auth.currentUser;
    console.log("user", user);
    this.props.fetchFeed(user);
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
