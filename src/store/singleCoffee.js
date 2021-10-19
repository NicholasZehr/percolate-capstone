import {
  collection,
  getDocs,
  getDoc,
  doc,
  where,
  query,
} from "firebase/firestore";
import db from "../firebase";

// action types

const GET_SINGLE_COFFEE = "GET_SINGLE_COFFEE";
const ADD_LIKE_COFFEE = "ADD_LIKE_COFFEE";

const getSingleCoffee = (coffee) => {
  return {
    type: GET_SINGLE_COFFEE,
    coffee,
  };
};

const _addLikeCoffee = (reviewId, index) => {
  return {
    type: ADD_LIKE_COFFEE,
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

      dispatch(getSingleCoffee(singleCoffee));
    } catch (error) {
      return `Error ${error.message} fetch single coffee thunk`;
    }
  };
};
const addCoffeeLike = (reviewId, index) => {
  return async (dispatch) => {
    try {
      dispatch(_addLikeCoffee(reviewId, index));
    } catch (error) {
      console.error(error);
    }
  };
};

const singleCoffeeReducer = (state = {}, action) => {
  console.log(action);
  switch (action.type) {
    case GET_SINGLE_COFFEE:
      return action.coffee;
    case ADD_LIKE_COFFEE:
      return {
        ...state,
        reviews: [
          ...state.reviews,
          (state.reviews[action.index].likeCount += 1),
        ],
      };
    default:
      return state;
  }
};

export default singleCoffeeReducer;
export { fetchSingleCoffee, addCoffeeLike };
