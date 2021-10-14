import { FETCH_BUSINESS, FETCH_BUSINESSES } from './businessesReducer'
import { collection, getDocs, getDoc, doc } from 'firebase/firestore';
import db from '../firebase';

// ------------------ Actions creators --------------------

export const _fetchBusinesses = businesses => ({
  type: FETCH_BUSINESSES,
  businesses
})

export const _fetchBusiness = business => ({
  type: FETCH_BUSINESS,
  business
})

// ------------------ Thunk creators -----------------------

export const fetchBusinesses = () => {
  return async dispatch => {
    try {
      const response = await getDocs(collection(db, 'businesses'));
      let businesses = []
      response.forEach(business=>businesses.push(business))
      dispatch(_fetchBusinesses(businesses))
      console.log('businesses fetch response:', businesses)
    } catch (error) {
      console.log('Failed to fetch all businesses')
      return
    }
  }
}

export const fetchBusiness = businessId=> {
  return async dispatch => {
    try {
      const response = await getDoc(doc(db, 'businesses', businessId));
      dispatch(_fetchBusiness(response))
      console.log('fetch was called: ',response)
    } catch (error) {
      console.log('Failed to fetch single business')
      return
    }
  }
}
