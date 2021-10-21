import { collection, doc, getDocs, query } from "firebase/firestore";
import db from "../firebase";

// action creators
const GET_FEED_REVIEWS = "GET_FEED_REVIEWS";

// action

const getFeedReviews = (reviews) => {
  return {
    type: GET_FEED_REVIEWS,
    reviews,
  };
};

// thunk

const fetchFeedReviews = (me) => {
  return async (dispatch) => {
    console.log("thunk me", me);
    const userRef = doc(db, "Users", me);
    console.log("ref", userRef);

    const feedRef = collection(db, "reviews");
    const revQuery = query(feedRef);

    const reviews = await getDocs(revQuery);
    let reviewsArr = [];
    reviews.forEach((review) => {
      reviewsArr.push(review.data());
    });

    // query reviews where reviewer id is in my own followed

    dispatch(getFeedReviews(reviewsArr));
  };
};

// reducer
const feedReducer = (state = [], action) => {
  switch (action.type) {
    case GET_FEED_REVIEWS:
      return action.reviews;
    default:
      return state;
  }
};

export { fetchFeedReviews };
export default feedReducer;
