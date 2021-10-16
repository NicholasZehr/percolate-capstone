import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchReviews } from "../../store/reviewActions";

class ReviewPane extends Component {
  componentDidMount() {
    console.log("I mounted!!!");
    this.props.fetchReviews('type', 'id');
  }
  render() {
    console.log( 'review props',this.props)
    return <div>hey guys here I am in the render</div>;
  }
}

const mapState = (state) => {
  return {
    reviews: state.review.reviews,
  };
};
const mapDispatch = (dispatch) => ({
  fetchReviews: (type, id) => dispatch(fetchReviews("coffee", "1")),
});

export default connect(mapState, mapDispatch)(ReviewPane);
