export const ADD_REVIEW = "ADD_REVIEW";
export const FETCH_REVIEWS = "FETCH_REVIEWS";
export const GET_SINGLE_REVIEW = "GET_SINGLE_REVIEW";
export const ADD_LIKE = "ADD_LIKE";
export const REMOVE_LIKE = "REMOVE_LIKE";

// ------------------ Initial State -----------------------
const initialState = {
  review: {},
  reviews: [],
};

//==================== REDUCER FUNCTION ====================
export default function reviewReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_REVIEW:
      return { ...state, reviews: [action.review, ...state.reviews] };
    case FETCH_REVIEWS:
      return { ...state, reviews: action };
    case GET_SINGLE_REVIEW:
      return { ...state, review: action.review };
    case ADD_LIKE:
      console.log("Add like to store now");
      return;
    case REMOVE_LIKE:
      console.log("Remove like from store now");
      return;

    default:
      return state;
  }
}
