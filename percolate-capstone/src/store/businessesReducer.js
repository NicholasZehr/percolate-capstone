export const FETCH_BUSINESS = 'FETCH_BUSINESS'
export const FETCH_BUSINESSES = 'FETCH_BUSINESSES'

// ------------------ Initial State -----------------------
const initialState = {
  businesses: [],
  business: {}
}

//==================== REDUCER FUNCTION ====================
export default function businesssesReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_BUSINESSES:
      return { ...state, businesses: action.businesses }
    case FETCH_BUSINESS:
      return { ...state, business: action.business }
    default:
      return state
  }
}
