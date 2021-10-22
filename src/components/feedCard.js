import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { fetchSingleCoffee } from "../store/singleCoffee";

const FeedCard = (props) => {
  const history = useHistory();
  // const dispatch = useDispatch();
  // const singleCoffee = useSelector((state) => state.singleCoffee);
  // const [coffee, setCoffee]= useState(singleCoffee)
  // useEffect(() => {
  //   if (props.review) {
  //     console.log("sheldon", singleCoffee);
  //     dispatch(fetchSingleCoffee(props.review.coffeeId));
  //   }
  // }, []);
  //CSS textarea expanding
  const textarea = document.getElementById("txt");
  if (textarea) {
    textarea.addEventListener("input", function (e) {
      this.style.height = "auto";
      this.style.height = this.scrollHeight + "px";
    });
  }

  let time = props.review.time
    ? new Date(props.review.time.seconds * 1000)
    : "no time";
  function timeDifference(input) {
    input *= 1000
    let msPerMinute = 60 * 1000;
    let msPerHour = msPerMinute * 60;
    let msPerDay = msPerHour * 24;
    let msPerMonth = msPerDay * 30;
    let msPerYear = msPerDay * 365;
    let current = Date.now();
    let elapsed = current - input;

    if (elapsed < msPerMinute) {
      return Math.round(elapsed / 1000) + " secs ago";
    } else if (elapsed < msPerHour) {
      return Math.round(elapsed / msPerMinute) + " mins ago";
    } else if (elapsed < msPerDay) {
      return Math.round(elapsed / msPerHour) + " hours ago";
    } else if (elapsed < msPerMonth) {
      return "approximately " + Math.round(elapsed / msPerDay) + " days ago";
    } else if (elapsed < msPerYear) {
      return (
        "approximately " + Math.round(elapsed / msPerMonth) + " months ago"
      );
    } else {
      return "approximately " + Math.round(elapsed / msPerYear) + " years ago";
    }
  }
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
              onClick={(_) => history.push(`/users/${props.user.uid}`)}
            />
          </div>
          <div className="nameAndTime">
            <span className="writepost">{props.user.displayName}: </span>
            {props.review.time ? (
              <span className="ago">{`${timeDifference(props.review.time.seconds)}`}</span>
            ) : (
              <span className="ago">no time</span>
            )}
          </div>
          <div className="username writepost">
            <p>{props.review.reviewContent}</p>
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
            alt="favorite coffee"
            src={singleCoffee ? singleCoffee.photoUrl : singleCoffee}
          />
          <div className="coffeeInfo">
            <p>Roast: {props.review.roast}</p>
            <p>Brand: {props.review.brandName}</p>
            <p>
              <b>{props.user.displayName}'s </b>Rating: {props.review.rating}/5
            </p>
            <p>Location: {props.review.roasterCity}</p>
          </div>
        </div>
      </div>
      <div className="self feeding cardUp">
        <div className="blank"></div>

        <div className="likes">
          <img className="heart" src="/heart.png" alt="Like Heart Icon" />
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
