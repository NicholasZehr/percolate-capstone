import React, { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { fetchUser } from "../store/Actions/usersActions";
import db from "../firebase";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayRemove,
  arrayUnion,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Modal from "react-modal";
import { fetchLoginUser } from "../store/auth";
import FeedCard from "./feedCard";
import { fetchReviews } from "../store/reviewActions";
import { Redirect } from "react-router-dom";

Modal.setAppElement("#root");

const Home = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.auth);
  const auth = getAuth();
  const [user, setUser] = useState(getAuth().currentUser);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const reviews = useSelector((state) => state.review.reviews);
  const [write, setWrite] = useState(false);
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
    let mounted = true;

    //======push followers in list,and following in fol
    if (Object.keys(loggedInUser).length > 0) {
      if (loggedInUser.following && loggedInUser.followers) {
        loggedInUser.followers.forEach((element) => {
          //========== find wether the current profile page is followed
          list.push(element);
        });
        loggedInUser.following.forEach((each) => {
          // this is push to followiing
          fol.push(each);
        });
      }
    }
    //fetching posts from firestore
    if (user) {
      dispatch(fetchReviews("user", user.uid));
    }
    if (mounted) {
      setFollowers(list);
      setFollowing(fol);
    }
    return () => {
      mounted = false;
    };
  }, [loggedInUser]);

  function writePage() {
    setWrite(!write);
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    console.log(evt);
    // if (loggedInUser) {
    //   const content = evt.target.content.value;
    //   const userRef = doc(db, "comments", loggedInUser.uid);
    //   await setDoc(
    //     userRef,
    //     {
    //       coffeeId: null,
    //       likeCount: 0,
    //       rating: null,
    //       userId: loggedInUser.uid,
    //       username: loggedInUser.username ? loggedInUser.username : null,
    //       reviews: arrayUnion(content),
    //     },
    //     { merge: true }
    //   );
    // }
  };

  return (
    <>
      {loggedInUser && user ? (
        <div className="home">
          <Modal className="modal" isOpen={write} onRequestClose={writePage}>
            <div className="imageBox post">
              <img
                className="profPic"
                alt="User Profile AVI"
                src={user ? user.photoURL || "/guest.jpeg" : "/guest.jpeg"}
              />
              <div className="username writepost">
                {user ? (
                  <p>{user.displayName + " " + loggedInUser.lastName}</p>
                ) : (
                  "Sign in"
                )}
              </div>
            </div>
            <div>
              <form className="form" onSubmit={handleSubmit}>
                <textarea
                  rows="5"
                  className="textarea"
                  maxLength="500"
                  name="content"
                  placeholder={`What's on your mind? ${
                    user ? user.displayName : ""
                  }`}
                ></textarea>
                <div className="signupBox">
                  <button className="signupPage">Post</button>
                </div>
              </form>
            </div>
          </Modal>
          <div className="leftSide">
            <div className="self">
              <h3>{`Welcome, ${
                loggedInUser ? loggedInUser.displayName : "Guest"
              }!`}</h3>
            </div>
            <div className="self">
              <span className="favoriteTitle">My favorite coffee:</span>
              <img
                className="favCoffee"
                src={loggedInUser ? loggedInUser.coffeeURL : "whiteBack2.png"}
              />
            </div>
            <div className="self">
              <p className="favoriteTitle">You have:</p>
              <span>{followers.length} followers </span>
              <span>{following.length} followings </span>
            </div>
          </div>

          <div className="centerBody">
            {reviews.length > 0
              ? reviews.map((each, index) => (
                  <FeedCard
                    key={index}
                    handleSubmit={handleSubmit}
                    writePage={writePage}
                    review={each}
                    user={user}
                    loggedInUser={loggedInUser}
                  />
                ))
              : ""}
          </div>
          <div className="rightSide">
            <div className="productAndBusiness">fdsafdsafsda</div>
          </div>
        </div>
      ) : (
        <div className="home loading">
          <div className="self loading">
            <p>Loading ...</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
