import React, { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { fetchUser } from "../store/Actions/usersActions";
import db from "../firebase";
import {
  doc,
  setDoc,
  updateDoc,
  arrayRemove,
  arrayUnion,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { fetchLoginUser } from "../store/auth";

const Home = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.auth);
  const auth = getAuth();
  const [user, setUser] = useState(getAuth().currentUser);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  onAuthStateChanged(auth, (u) => {
    setUser(u);
  });
  useEffect(() => {
    let mounted = true;
    async function fetchData() {
      //* Fetch the user using it's id
      await dispatch(fetchLoginUser());
    }
    if (mounted) {
      fetchData();
    }
    return () => {
      mounted = false;
    };
  }, [user]);

useEffect(() => {
  const list = [];
  const fol = [];
  let found = false;
  let mounted = true;

  //======push followers in list,and following in fol
  if (Object.keys(loggedInUser).length > 0) {
    loggedInUser.followers.forEach((element) => {
      //========== find wether the current profile page is followed
      list.push(element);
    });
    loggedInUser.following.forEach((each) => {
      // this is push to followiing
      fol.push(each);
    });
  }
  // set them in local state
  if (mounted) {
    setFollowers(list);
    setFollowing(fol);
  }

  return () => {
    mounted = false;
  };
}, [loggedInUser]);

  return (
    <div className="home">
      <div className="leftBody">
        <div className="self">
          <h3>{`Welcome, ${
            loggedInUser ? loggedInUser.displayName : "Guest"
          }!`}</h3>
        </div>
        <div className="intro">
          <span className="favoriteTitle">My favorite coffee:</span>
          <img
            className="favCoffee"
            src={loggedInUser ? loggedInUser.coffeeURL : "whiteBack2.png"}
          />
        </div>
        <div className="followers fbox">
          <p className="favoriteTitle">You have:</p>
          <span>{followers.length} followers </span>
          <span>{following.length} followings </span>
        </div>
      </div>

      <div className="centerBody">
        <div className="self">fdafdsafdsa</div>
      </div>
      <div className="rightSide">
        <div className="productAndBusiness">fdsafdsafsda</div>
      </div>
    </div>
  );
};

export default Home;
