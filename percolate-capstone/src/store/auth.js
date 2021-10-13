
import history from '../history';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
const TOKEN = 'token'

/**
 * ACTION TYPES
 */
const SET_AUTH = 'SET_AUTH'

/**
 * ACTION CREATORS
 */
const setAuth = auth => ({ type: SET_AUTH, auth })

/**
 * THUNK CREATORS
 */

export const authenticate =
  (username, password) => async (dispatch) => {
    try {
      const auth = getAuth()
      const response = await signInWithEmailAndPassword(auth, username, password);
      window.localStorage.setItem(TOKEN, response.user.accessToken);
    } catch (authError) {
      return dispatch(setAuth({ error: authError }));
    }
  };
export const authenticateSignup = (user, method) => async (dispatch) => {

};

export const logout = () => {
  const auth = getAuth();
  window.localStorage.removeItem(TOKEN)
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      console.log('you signed out')
    })
    .catch((error) => {
      // An error happened.
      console.log(error)
    });
  return {
    type: SET_AUTH,
    auth: {},
  };
};

/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case SET_AUTH: {
      return { ...action.auth, loaded: true };
    }
    default:
      return state;
  }
}