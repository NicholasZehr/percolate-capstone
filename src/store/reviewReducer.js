export const ADD_REVIEW = "ADD_REVIEW";
export const FETCH_REVIEWS = "FETCH_REVIEWS";

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
    default:
      return state;
  }
}
