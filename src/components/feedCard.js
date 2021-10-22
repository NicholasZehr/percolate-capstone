import React, { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchSingleCoffee } from "../store/singleCoffee";

const FeedCard = (props) => {
  const dispatch = useDispatch();
  const singleCoffee = useSelector((state) => state.singleCoffee);

  useEffect(() => {
    if (props.review) {
      console.log('sheldon',props.review)
      dispatch(fetchSingleCoffee(props.review.coffeeId));
    }
    console.log(singleCoffee);
  }, []);
  //CSS textarea expanding
  const textarea = document.getElementById("txt");
  if(textarea){textarea.addEventListener("input", function (e) {
    this.style.height = "auto";
    this.style.height = this.scrollHeight + "px";
  });}
  
  return (
    <>
      <div className="self feeding cardDown">
        <div className="headNPost">
          <div className="imageBox post">
            <img
              className="profPic"
              alt="User Profile AVI"
              src={
                props.user
                  ? props.user.photoURL || "/guest.jpeg"
                  : "/guest.jpeg"
              }
            />
            <div className="username writepost">
              {props.user ? (
                <p>
                  {props.user.displayName + " " + props.loggedInUser.lastName}
                </p>
              ) : (
                "Sign in"
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        className="self feeding cardUpAdjustment"
        onClick={(_) => console.log("fdsafdsafdf", singleCoffee)}
      >
        <div className="headNPost card">
          <img
            className="favCoffee"
            src={singleCoffee ? singleCoffee.photoUrl : singleCoffee}
          />
          <div className="coffeeInfo">
            <p>Roast: {singleCoffee.roast}</p>
            <p>Brand: {singleCoffee.brandName}</p>
            <p>Average Rate: {singleCoffee.avgRating}</p>
            <p>Location: {singleCoffee.roasterCity}</p>
          </div>
        </div>
      </div>
      <div className="self feeding cardUp">
        <div className="blank"></div>

        <div className="likes">
          <img className="heart" src="/heart.png" />
          <p>Like</p>
        </div>
        <i className="material-icons flip">chat</i>
        <div className="comments">
          <p>Comments</p>
        </div>
      </div>
      <div className="self feeding cardUptwo">
        <form className="form" onSubmit={props.handleSubmit}>
          <div className="headNPost">
            <div className="imageBox commentImage">
              <img
                className="profPic"
                alt="User Profile AVI"
                src={
                  props.user
                    ? props.user.photoURL || "/guest.jpeg"
                    : "/guest.jpeg"
                }
              />
            </div>

            <div className="post-input ">
              <textarea
                className="textarea"
                id="txt"
                maxLength="200"
                placeholder="Write a comment..."
              ></textarea>
            </div>
            <button className="postNow">
              <i className="fa fa-paper-plane-o"></i>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default FeedCard;
