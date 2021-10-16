import { ADD_REVIEW, FETCH_REVIEWS } from "./reviewReducer";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import db from "../firebase";

// ------------------ Actions creators --------------------

export const _addReview = (review) => ({
  type: ADD_REVIEW,
  review,
});

export const _fetchReviews = (reviews) => {
  return {
    type: FETCH_REVIEWS,
    reviews,
  };
};

// ------------------ Thunk creators -----------------------

export const addReview = (review) => {
  return async (dispatch) => {
    try {
      await addDoc(collection(db, "reviews"), review);
      dispatch(_addReview(review));
      console.log("add review:", review);
    } catch (error) {
      console.error(error);
      console.log("Failed to add review");
      return;
    }
  };
};

export const fetchReviews = (type, id) => {
  return async (dispatch) => {
    try {
      console.log(`${type}Id`, id);
      const q = query(collection(db, "reviews"), where(`${type}Id`, "==", id));
      const docSnap = await getDocs(q);

      const reviewsArr = [];
      docSnap.forEach((doc) => {
        //console.log("doc", doc.data());
        reviewsArr.push(doc.data());
      });

      console.log(reviewsArr);
      dispatch(_fetchReviews(reviewsArr));
    } catch (error) {
      console.error(error);
    }
  };
};
