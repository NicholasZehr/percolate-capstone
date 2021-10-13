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

const fetchSingleCoffee = () => {
  return async (dispatch) => {
    try {
      const docRef = query(
        collection(db, "coffees"),
        where("brandName", "==", `Superlost`),
        where("name", "==", "Supernova")
      );
      const response = await getDocs(docRef);
      let oneCoffee = null;
      response.forEach((coffee) => (oneCoffee = coffee.data()));
      dispatch(getSingleCoffee(oneCoffee));
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
