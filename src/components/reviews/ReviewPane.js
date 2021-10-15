import React from "react";
import { connect } from "react-redux";
import { fetchReviews } from "../../store/reviewActions";

class ReviewPane extends React.Component {
  componentDidMount() {
    console.log("I mounted!!!");
    this.props.fetchReviews();
  }
  render() {
    return <div>{this.props.reviews}</div>;
  }
}

const mapState = (state) => {
  return {
    reviews: state.review.reviews,
  };
};
const mapDispatch = (dispatch) => ({
  fetchReviews: () => dispatch(fetchReviews("coffee", "C13")),
});

export default connect(mapState, mapDispatch)(ReviewPane);
