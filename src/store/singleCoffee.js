import {
  collection,
  getDocs,
  getDoc,
  doc,
  where,
  query,
} from "firebase/firestore";
import db from "../firebase";
import { fetchSingleCoffeeReviews } from "./reviewActions";
// action types

const GET_SINGLE_COFFEE = "GET_SINGLE_COFFEE";
const ADD_LIKE_COFFEE = "ADD_LIKE_COFFEE";
const REMOVE_LIKE_COFFEE = "REMOVE_LIKE_COFFEE";

const dispatchSingleCoffee = (coffee, coffeeId) => {
  return (dispatch) => {
    dispatch(fetchSingleCoffeeReviews(coffeeId));
    dispatch(getSingleCoffee(coffee));
  };
};

const getSingleCoffee = (coffee) => {
  return {
    type: GET_SINGLE_COFFEE,
    coffee,
  };
};

export const _addLikeCoffee = (reviewId, index) => {
  return {
    type: ADD_LIKE_COFFEE,
    reviewId,
  };
};
export const _removeLikeCoffee = (reviewId, index) => {
  return {
    type: REMOVE_LIKE_COFFEE,
    reviewId,
    index,
  };
};
// thunk

const fetchSingleCoffee = (coffeeId) => {
  return async (dispatch) => {
    try {
      const docRef = doc(db, "coffees", coffeeId);
      const docSnap = await getDoc(docRef);
      const singleCoffee = docSnap.data();
      dispatch(dispatchSingleCoffee(singleCoffee, coffeeId));
    } catch (error) {
      return `Error ${error.message} fetch single coffee thunk`;
    }
  };
};

const singleCoffeeReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_COFFEE:
      return action.coffee;
    case ADD_LIKE_COFFEE:
      const addReviewLike = Array.from(state.reviews);
      addReviewLike.map((element, index) => {
        return console.log(element);
      });
      return {
        ...state,
        reviews: addReviewLike,
      };
    case REMOVE_LIKE_COFFEE:
      const removeReviewLike = Array.from(state.reviews);
      removeReviewLike.splice(action.index, 1, {
        ...state.reviews[action.index],
        likeCount: state.reviews[action.index].likeCount - 1,
      });
      return {
        ...state,
        reviews: removeReviewLike,
      };
    default:
      return state;
  }
};

export default singleCoffeeReducer;
export { fetchSingleCoffee };
