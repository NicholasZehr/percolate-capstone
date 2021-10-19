import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import { fetchUser } from "../../store/Actions/usersActions";
import db from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import EditProfileButton from "./EditProfileButton";
import Modal from "react-modal";

Modal.setAppElement("#root");

const SingleUserPage = () => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  //componentDidMount here
  const auth = getAuth();
  const [user, setUser] = useState(getAuth().currentUser);
  const [edit, setEdit] = useState(false);
  const realUser = useSelector((state) => state.users.user);
  const [followers, setFollowers] = useState([]);
  onAuthStateChanged(auth, (u) => {
    setUser(u);
  });

  useEffect(() => {
    let mounted = true;
    async function fetchData() {
      //* Fetch the user using it's id
      await dispatch(fetchUser(id));
    }
    if (mounted) {
      fetchData();
    }
    return () => {
      mounted = false;
    };
  }, [id]);
  useEffect(() => {
    const list = [];
    let mounted = true;
    if (Object.keys(realUser).length > 0) {
      realUser.followers.forEach((element) => {
        list.push(element);
      });
    }
    if (mounted) {
      setFollowers(list);
    }
    return () => {
      mounted = false;
    };
  }, [realUser]);

  function editPage() {
    setEdit(!edit);
  }

  return (
    <div className="singleUserPageBox">
      <Modal className="modal" isOpen={edit} onRequestClose={editPage}>
        <EditProfileButton edit={edit} setEdit={setEdit} user={user} />
      </Modal>
      <div className="profileBox">
        <div className="profileCover">
          <div className="shadow">
            <img
              className="cover"
              src={realUser ? realUser.coverURL : "/whiteBack2.png"}
            />
          </div>
        </div>
        <div className="profilePicNavBox">
          <div className="blank2"></div>
          <div className="pictureBox">
            <img
              className="profPic ownpage"
              src={realUser ? realUser.photoURL : "/guest.jpeg"}
            />
          </div>
          <div className="profileNavBar">
            <div onClick={editPage} className="editProfileButton">
              Edit Profile
            </div>
            <div onClick={editPage} className="editProfileButton">
              Follow
            </div>
            <div onClick={editPage} className="editProfileButton">
              Unfollow
            </div>
            <h2>
              {realUser
                ? (realUser.firstName || realUser.displayName) +
                  " " +
                  realUser.lastName
                : ""}
            </h2>
            <hr className="divider" />
            <div className="menu">
              <div>Reviews</div>
              <div>About</div>
              <div>Followers</div>
              <div>Photos</div>
            </div>
          </div>
          <div className="blank2"></div>
        </div>
      </div>
      <div className="body">
        <div className="blank2"></div>
        <div className="leftBody">
          <div className="intro">
            <h2>Intro: </h2>
            <span className="favoriteTitle">My favorite coffee:</span>
            <img
              className="favCoffee"
              src={realUser ? realUser.coffeeURL : "whiteBack2.png"}
            />
          </div>
          <div className="followers">
            <h2>Followers:</h2>
            <div className="followerListBox">
              {followers.length > 0
                ? followers.map((each, index) => {
                    return (
                      <div
                        key={index}
                        className="followerIcon"
                        onClick={() => history.push(`/users/${each.uid}`)}
                      >
                        <img
                          className="profPic followerIcon"
                          src={each.photoURL}
                        />
                        <span>{each.firstName}</span>
                      </div>
                    );
                  })
                : "You have no followers"}
            </div>
          </div>
        </div>
        <div className="rightBody"></div>
        <div className="blank2"></div>
      </div>
    </div>
  );
};
export default SingleUserPage;
