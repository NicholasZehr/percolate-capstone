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

const getSingleCoffee = (coffee) => {
  return {
    type: GET_SINGLE_COFFEE,
    coffee,
  };
};

// thunk

const fetchSingleCoffee = (coffeeId) => {
  return async (dispatch) => {
    try {
      const docRef = doc(db, "coffees", coffeeId);
      const docSnap = await getDoc(docRef);

      //console.log("snap", docSnap.data());
      const singleCoffee = docSnap.data();

      dispatch(getSingleCoffee(singleCoffee));
    } catch (error) {
      return `Error ${error.message} fetch single coffee thunk`;
    }
  };
};

const singleCoffeeReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_COFFEE:
      return action.coffee;
    default:
      return state;
  }
};

export default singleCoffeeReducer;
export { fetchSingleCoffee };
