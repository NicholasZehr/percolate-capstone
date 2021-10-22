/* eslint-disable jsx-quotes */
/*eslint jsx-quotes: ["error", "prefer-single"]*/
import React from "react";
import { connect } from "react-redux";
import { addReview } from "../../store/reviewActions";
import ReviewPane from "./ReviewPane";
import { getAuth } from "firebase/auth";
import { serverTimestamp } from "firebase/firestore";
const auth = getAuth();

class AddReview extends React.Component {
  constructor() {
    super();
    this.errors = [];
    this.state = {
      brandName: "",
      photoUrl: "",
      roast: "",
      roasterCity: "",
      name: "",
      businessId: "",
      coffeeId: "",
      rating: 0.0,
      reviewContent: "",
      userId: "",
      username: "",
      time: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate(prevProps) {}

  handleSubmit(event) {
    const { ...review } = this.state;
    event.preventDefault();
    let newReview = {
      brandName: this.props.brandName,
      photoUrl: this.props.photoUrl,
      roast: this.props.roast,
      roasterCity: this.props.roasterCity,
      name: this.props.name,
      businessId: this.props.businessId ? this.props.businessId : null,
      coffeeId: this.props.coffeeId ? this.props.coffeeId : null,
      likeCount: 0,
      rating: review.rating,
      reviewContent: review.reviewContent,
      userId: auth.currentUser.uid ? auth.currentUser.uid : null,
      username: auth.currentUser.displayName
        ? auth.currentUser.displayName
        : null,
      time: serverTimestamp(),
    };
    this.props.addR(newReview);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (
      <div className="new-review-container">
        <form
          id="form_review_new"
          className="form-review-new"
          onSubmit={this.handleSubmit}
        >
          <div className="form-input-submit-group">
            {/* {this.state.error ? (
              <ul className="error-label">
                {this.error.map((error) => (
                  <li>{error}</li>
                ))}
              </ul>
            ) : null} */}
            <label htmlFor="rating">Rating</label>
            <input
              className="form-text-box"
              type="number"
              name="rating"
              placeholder={0.0}
              min="0"
              max="5"
              onChange={this.handleChange}
            />
            <label htmlFor="reviewContent">Review Comments</label>
            <textarea
              className="form-text-box"
              type="text"
              name="reviewContent"
              placeholder="Your comment here..."
              onChange={this.handleChange}
            />
            <button className="review-submit-button" type="submit">
              Submit Review
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapState = () => ({});
const mapDispatch = (dispatch) => ({
  addR: (review) => dispatch(addReview(review)),
});

export default connect(mapState, mapDispatch)(AddReview);
