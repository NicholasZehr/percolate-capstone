import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  query,
  where,
  arrayUnion,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import db from "../firebase";
import { increment, serverTimestamp } from "firebase/firestore";
import _addLikeCoffee from "./singleCoffee";

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

const fetchFeedReviews = () => {
  return async (dispatch) => {
    //do some stuff
    let reviews;

    dispatch(getFeedReviews(reviews));
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
