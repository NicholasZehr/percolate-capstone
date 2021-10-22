import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import db from "../firebase";
//import usersReducer from "./Reducers/usersReducer";

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
    // get your following list
    console.log("thunk me", me);
    const userRef = doc(db, "Users", me);
    const docSnap = await getDoc(userRef);
    const followingArr = docSnap.data().following;
    console.log("following list", followingArr);

    // reviews
    const feedRef = collection(db, "reviews");
    let reviewsArr = [];

    // for each user in folliowing arr, get their reviews.
    // followingArr.forEach(async (following) => {
    //   console.log("single following", following);
    //   let revQuery = query(feedRef, where("userId", "==", following.uid)); // where user is in my following list
    //   const reviews = await getDocs(revQuery);
    //   reviews.forEach((review) => {
    //     reviewsArr.push(review.data());
    //   });
    // });

    for await (const following of followingArr) {
      console.log("single following", following);
      let revQuery = query(feedRef, where("userId", "==", following.uid)); // where user is in my following list
      const reviews = await getDocs(revQuery);
      reviews.forEach((review) => {
        console.log("single review", review);
        reviewsArr.push(review.data());
      });
    }

    console.log("arr", reviewsArr);

    // organize by most recent

    //pagination ??

    // dispatch to state/store

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
