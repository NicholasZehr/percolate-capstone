import history from '../history';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  setPersistence,
  browserSessionPersistence,
} from 'firebase/auth';
const TOKEN = 'token';

/**
 * ACTION TYPES
 */
const SET_AUTH = 'SET_AUTH';

/**
 * ACTION CREATORS
 */
const setAuth = (auth) => ({ type: SET_AUTH, auth });

/**
 * THUNK CREATORS
 */
export const me = () => async (dispatch) => {
  const auth = getAuth()
  auth.onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      console.log('signed in', user)
      dispatch(setAuth(user))
    } else {
      console.log('not signed in')
    }
  });
};
export const authenticate = (username, password) => async (dispatch) => {
  try {
    const auth = getAuth();
    const response = await signInWithEmailAndPassword(auth, username, password);
    dispatch(me())
  } catch (authError) {
    return dispatch(setAuth({ error: authError }));
  }
};
export const authenticateSignup = (user, method) => async (dispatch) => {};

export const logout = () => {
  const auth = getAuth();
  window.localStorage.removeItem(TOKEN);
  signOut(auth)
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
