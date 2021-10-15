import history from '../history';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  setPersistence,
  browserSessionPersistence,
} from 'firebase/auth';
import { collection, doc, setDoc } from 'firebase/firestore';
import db from '../firebase';

const TOKEN = 'token';

const SET_AUTH = 'SET_AUTH';

const setAuth = (auth) => ({ type: SET_AUTH, auth });

export const me = () => async (dispatch) => {
  const auth = getAuth()
  auth.onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      console.log('signed in')
      dispatch(setAuth(user))
    } else {
      console.log('not signed in')
    }
  });
};
export const authenticate = (username, password) => async (dispatch) => {
  const auth = getAuth();
  try {
    signOut(auth);
    await signInWithEmailAndPassword(auth, username, password);
    dispatch(me())
  } catch (authError) {
    return dispatch(setAuth({ error: authError }));
  }
};
export const authenticateSignup = (user) => async (dispatch) => {
  try { 
    const auth = getAuth()
    signOut(auth);
    const response = await createUserWithEmailAndPassword(auth, user.email, user.password);
    const users = collection(db, 'Users')
    await setDoc(doc(users, response.user.uid), {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  } catch (error) {
    console.log(error)
    return dispatch(setAuth({error}))
  }
};

export const logout = () => {
  const auth = getAuth();
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
      return { ...action.auth};
    }
    default:
      return state;
  }
}
