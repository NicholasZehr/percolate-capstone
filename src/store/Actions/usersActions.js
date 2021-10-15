import { collection, getDocs, getDoc, doc } from 'firebase/firestore';
import db from '../../firebase';
import { GET_USER, GET_ALL_USERS } from '../Reducers/usersReducer'


export const _fetchAllUsers = (users) => ({
  type: GET_ALL_USERS,
  users,
});

export const _fetchUser = (user) => ({
  type: GET_USER,
  user,
});
//============== THUNK ==================
export const fetchAllUsers = () => {
  return async (dispatch) => {
    try {
      const response = await getDocs(collection(db, 'users'));
      let users = [];
      console.log(response)
      response.forEach((business) => users.push(business));
      dispatch(_fetchAllUsers(users));
      console.log('users fetch response:', users);
    } catch (error) {
      console.log('Failed to fetch all users');
      return;
    }
  };
};

export const fetchUser = (userId) => {
  return async (dispatch) => {
    try {
      const response = await getDoc(doc(db, 'users', userId));
      dispatch(_fetchUser(response));
      console.log('fetch was called: ', response);
    } catch (error) {
      console.log('Failed to fetch single user');
      return;
    }
  };
};