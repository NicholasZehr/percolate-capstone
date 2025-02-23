import {
  FETCH_BUSINESS,
  FETCH_BUSINESSES,
  ADD_BUSINESS,
  ADD_LIKE_BUSINESS,
  REMOVE_LIKE_BUSINESS,
} from "./businessesReducer";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  /* updateDoc,
  query,
  where,
  increment, */
} from "firebase/firestore";
import db from "../firebase";

// ------------------ Actions creators --------------------

export const _fetchBusinesses = (businesses) => ({
  type: FETCH_BUSINESSES,
  businesses,
});

export const _fetchBusiness = (business) => ({
  type: FETCH_BUSINESS,
  business,
});

export const _addBusiness = (business) => ({
  type: ADD_BUSINESS,
  business,
});

export const _addLikeBusiness = (businessId) => {
  return {
    type: ADD_LIKE_BUSINESS,
    businessId,
  };
};
export const _removeLikeBusiness = (businessId) => {
  return {
    type: REMOVE_LIKE_BUSINESS,
    businessId,
  };
};

// ------------------ Thunk creators -----------------------

export const fetchBusinesses = () => {
  return async (dispatch) => {
    try {
      const response = await getDocs(collection(db, "businesses"));
      let businesses = [];
      response.forEach((business) => businesses.push(business));
      dispatch(_fetchBusinesses(businesses));
      console.log("businesses fetch response:", businesses);
    } catch (error) {
      console.log("Failed to fetch all businesses");
      return;
    }
  };
};

export const fetchBusiness = (businessId) => {
  return async (dispatch) => {
    try {
      const docRef = doc(db, "businesses", businessId);
      const docSnap = await getDoc(docRef);
      const singleBusiness = docSnap.data();
      dispatch(_fetchBusiness(singleBusiness));
    } catch (error) {
      console.log("Failed to fetch single business");
      return;
    }
  };
};

export const addBusiness = (business) => {
  return async (dispatch) => {
    try {
      const response = await addDoc(collection(db, "businesses"), business);
      dispatch(_addBusiness(response));
      console.log("add review response:", response);
    } catch (error) {
      console.log("Failed to add review");
      return;
    }
  };
};
