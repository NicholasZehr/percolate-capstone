import history from "../history";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";
import db from "../firebase";
//https://firebase.google.com/docs/auth/web/manage-users
const TOKEN = "token";

const SET_AUTH = "SET_AUTH";

const setAuth = (auth) => ({ type: SET_AUTH, auth });

export const authenticate = (username, password) => async (dispatch) => {
  const auth = getAuth();
  try {
    signOut(auth);
    await signInWithEmailAndPassword(auth, username, password);
    const user = auth.currentUser;
    console.log("what is currentUser", user);
    if (user !== null) {
      dispatch(setAuth(user));
    }
  } catch (authError) {
    return dispatch(setAuth({ error: authError }));
  }
};
export const authenticateSignup = (user) => async (dispatch) => {
  try {
    const auth = getAuth();
    signOut(auth);
    const response = await createUserWithEmailAndPassword(
      auth,
      user.email,
      user.password
    );
    updateProfile(auth.currentUser, {
      displayName: user.firstName,
      photoURL: user.photoURL,
    });
    const users = collection(db, "Users");
    await setDoc(doc(users, response.user.uid), {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      photoURL: user.photoURL,
    });
  } catch (error) {
    console.log(error);
    return dispatch(setAuth({ error }));
  }
};

export const logout = () => {
  const auth = getAuth();
  signOut(auth);
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
      return { ...action.auth };
    }
    default:
      return state;
  }
}
