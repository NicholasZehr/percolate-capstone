import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchFeedReviews } from "../../store/feed";

class Feed extends Component {
  constructor() {
    super();
  }

  render() {
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
    fetchFeed: () => dispatch(fetchFeedReviews()),
  };
};

export default connect(mapState, mapDispatch)(Feed);
