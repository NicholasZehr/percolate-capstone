import {
  ADD_LIKE,
  ADD_REVIEW,
  FETCH_REVIEWS,
  GET_SINGLE_REVIEW,
  REMOVE_LIKE,
} from "./reviewReducer";
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

export const _getSingleReview = (review) => {
  return {
    type: GET_SINGLE_REVIEW,
    review,
  };
};

export const _addLike = (reviewId) => {
  return {
    type: ADD_LIKE,
    reviewId,
  };
};

export const _removeLike = (reviewId) => {
  return {
    type: REMOVE_LIKE,
    reviewId,
  };
};

// ------------------ Thunk creators -----------------------

export const addReview = (review) => {
  return async (dispatch) => {
    try {
      // create the new review in teh review collection
      const newDoc = await addDoc(collection(db, "reviews"), review);

      // updating the array under coffees
      const updateArr = {
        coffeeId: review.coffeeId,
        content: review.reviewContent || null,
        username: review.username || null,
        rating: review.rating,
        reviewId: newDoc.id,
      };

      const coffeeRef = doc(db, "coffees", review.coffeeId);
      await updateDoc(coffeeRef, { reviews: arrayUnion(updateArr) });

      // adding a new review in store
      dispatch(_addReview(review));
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

export const fetchSingleReview = (reviewId) => {
  return async (dispatch) => {
    try {
      const docRef = doc(db, "reviews", reviewId);
      const docSnap = await getDoc(docRef);

      const singleReview = docSnap.data();
      dispatch(_getSingleReview(singleReview));
    } catch (error) {
      return `Error ${error.message} help get single review!`;
    }
  };
};

export const likeClick = (reviewId, userId, displayName, photoURL) => {
  return async (dispatch) => {
    try {
      console.log(
        "reviewId",
        reviewId,
        "userId",
        userId,
        "displayName",
        displayName,
        "photoURL",
        photoURL
      );
      const q = query(
        collection(db, "likeRelation"),
        where("reviewId", "==", reviewId),
        where("userId", "==", userId)
      );
      const docSnapLikeRelation = await getDocs(q);
      const docRefReviewLikeCount = doc(db, "reviews", reviewId);
      if (docSnapLikeRelation.docs.length) {
        console.log("this user has already liked the review");
        await updateDoc(docRefReviewLikeCount, {
          likeCount: increment(-1),
        });
        await deleteDoc(
          doc(db, "likeRelation", `${docSnapLikeRelation.docs[0].id}`)
        );
      } else {
        console.log("this user has not yet liked the review");
        const likeRelation = {
          userId: userId,
          reviewId: reviewId,
          time: serverTimestamp(),
          displayName: displayName,
          photoURL: photoURL,
        };
        await addDoc(collection(db, "likeRelation"), likeRelation);
        await updateDoc(docRefReviewLikeCount, {
          likeCount: increment(1),
        });
        dispatch(_addLikeCoffee(reviewId));
      }
    } catch (error) {
      console.error(error, "Failed to update like for review");
    }
  };
};
