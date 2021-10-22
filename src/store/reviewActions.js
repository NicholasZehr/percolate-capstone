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
  setDoc,
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
import { _addLikeCoffee, _removeLikeCoffee } from "./singleCoffee";
import { _addLikeBusiness, _removeLikeBusiness } from "./businessActions";

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

export const _addLike = (type, id) => {
  return (dispatch) => {
    dispatch(_addLikeReview(id));
    type === "coffee"
      ? dispatch(_addLikeCoffee(id))
      : dispatch(_addLikeBusiness(id));
  };
};

export const _removeLike = (type, id) => {
  return (dispatch) => {
    dispatch(_removeLikeReview(id));
    type === "coffee"
      ? dispatch(_removeLikeCoffee(id))
      : dispatch(_removeLikeBusiness(id));
  };
};
export const _addLikeReview = (reviewId) => {
  return {
    type: ADD_LIKE,
    reviewId,
  };
};

export const _removeLikeReview = (reviewId) => {
  return {
    type: REMOVE_LIKE,
    reviewId,
  };
};

// ------------------ Thunk creators -----------------------

export const addReview = (review) => {
  return async (dispatch) => {
    try {
      // create the new review in the review collection
      const newDoc = await addDoc(collection(db, "reviews"), review);

      // This constructs what we want to put in the subcollection when we display
      // a singleCoffee or singleBusiness
      const newReview = {
        content: review.content || null,
        username: review.username || null,
        rating: review.rating,
        likeCount: review.likeCount,
        userId: review.userId,
      };
      const coffeeRef = doc(
        db,
        "coffees",
        review.coffeeId,
        "coffeeReviews",
        newDoc.id
      );
      await setDoc(coffeeRef, newReview);
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
      const q = query(collection(db, "reviews"), where(`${type}Id`, "==", id));
      const docSnap = await getDocs(q);

      const reviewsArr = [];
      docSnap.forEach((doc) => {
        reviewsArr.push(doc.data());
      });

      dispatch(_fetchReviews(reviewsArr));
    } catch (error) {
      console.error(error);
    }
  };
};
export const fetchSingleCoffeeReviews = (id) => {
  return async (dispatch) => {
    try {
      const docRef = collection(db, "coffees", id, "coffeeReviews");
      const docSnap = await getDocs(docRef);
      const reviewsObj = {};
      docSnap.forEach((doc) => {
        reviewsObj[doc.id] = doc.data();
      });

      dispatch(_fetchReviews(reviewsObj));
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

export const likeClick = (
  id,
  reviewId,
  userId,
  displayName,
  photoURL,
  type
) => {
  return async (dispatch) => {
    try {
      const q = query(
        collection(db, "likeRelation"),
        where("reviewId", "==", reviewId),
        where("userId", "==", userId)
      );
      const docSnapLikeRelation = await getDocs(q);
      const docRefReviewLikeCount = doc(db, "reviews", reviewId);
      const docRefSubColLikeCount = doc(
        db,
        `${type}s`,
        id,
        `${type}Reviews`,
        reviewId
      );
      if (docSnapLikeRelation.docs.length) {
        console.log("this user has already liked the review");
        await updateDoc(docRefReviewLikeCount, {
          likeCount: increment(-1),
        });
        await updateDoc(docRefSubColLikeCount, {
          likeCount: increment(-1),
        });
        await deleteDoc(
          doc(db, "likeRelation", `${docSnapLikeRelation.docs[0].id}`)
        );
        dispatch(_removeLike(type, id));
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
        await updateDoc(docRefSubColLikeCount, {
          likeCount: increment(1),
        });
        dispatch(_addLike(type, id));
      }
    } catch (error) {
      console.error(error, "Failed to update like for review");
    }
  };
};
