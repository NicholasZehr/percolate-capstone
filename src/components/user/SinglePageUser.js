import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';
import { fetchUser } from '../../store/Actions/usersActions';
import db from '../../firebase';
import { doc, setDoc } from 'firebase/firestore';
import {
  getAuth,
  onAuthStateChanged,
  updateProfile,
  updatePassword,
} from 'firebase/auth';
import Modal from 'react-modal';
Modal.setAppElement('#root');



const SingleUserPage = () => {
  const {id} = useParams()
  const history = useHistory();
  const dispatch = useDispatch();
  //componentDidMount here
  const auth = getAuth();
  const [user, setUser] = useState(getAuth().currentUser);
  const [edit, setEdit] = useState(false);
  const realUser = useSelector((state) => state.users.user);
  const [followers, setFollowers] = useState([])


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
  }, []);
  useEffect(() => {
    const list = []
    if (Object.keys(realUser).length > 0) {
      realUser.followers.forEach((element) => {
        list.push(element);
      });
    }
    setFollowers(list)
  },[realUser])

  function editPage() {
    setEdit(!edit);
  }
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const userInfo = {
      email: evt.target.email.value,
      displayName: evt.target.firstName.value,
      lastName: evt.target.lastName.value,
      password: evt.target.password.value,
      photoURL: evt.target.photoURL.value,
      coverURL: evt.target.coverURL.value,
      favorite: evt.target.favorite.value,
      coffeeURL: evt.target.coffeeURL.value,
    };
    const nonEmptyValue = {}
    for (const key in userInfo) {
      if (userInfo[key].length > 0 && key!=="password") {
        nonEmptyValue[key] = userInfo[key]
      }
    }

    //================== update basic info in auth

    updateProfile(auth.currentUser, nonEmptyValue, user);

    //================== update password in auth
    if (userInfo.password.length >= 6) {
      updatePassword(auth.currentUser, userInfo.password)
        .then(() => {
          // Update successful.
          console.log('Yes, password changed');
        })
        .catch((error) => {
          // An error ocurred
          // ...
          console.log('somthing wrong');
        });
    }
    console.log(nonEmptyValue)
    //============== update detail info in firestore data
    const userRef = doc(db, 'Users', user.uid);
    await setDoc(userRef, nonEmptyValue, {merge:true});
    //==============update redux store user info
    await dispatch(fetchUser(user ? user.uid : {}));
    setEdit(!edit);
  };
  return (
    <div className="singleUserPageBox">
      <Modal className="modal" isOpen={edit} onRequestClose={editPage}>
        <div className="close" onClick={editPage}></div>
        <h2>Edit Profile</h2>
        <form
          className="signupform"
          open={false}
          onSubmit={handleSubmit}
          name="signup"
        >
          <div className="emailBox mod">
            <span className="formName">Email:</span>
            <input
              className="email"
              name="email"
              type="text"
              placeholder="Email"
            />
            <div className="blank3"></div>
          </div>
          <div className="emailBox mod">
            <span className="formName">Display Name:</span>
            <input
              className="email"
              name="firstName"
              type="text"
              placeholder="Frist Name"
            />
            <div className="blank3"></div>
          </div>
          <div className="emailBox mod">
            <span className="formName">Last Name:</span>
            <input
              className="email"
              name="lastName"
              placeholder="Last Name"
              type="text"
            />
            <div className="blank3"></div>
          </div>
          <div className="emailBox mod">
            <span className="formName">Password:</span>
            <input
              className="email"
              name="password"
              placeholder="Password"
              type="password"
            />
            <div className="blank3"></div>
          </div>
          <div className="emailBox mod">
            <span className="formName">Profile Picture:</span>
            <input
              className="email"
              name="photoURL"
              type="text"
              placeholder="picture URL"
            />
            <div className="blank3"></div>
          </div>
          <div className="emailBox mod">
            <span className="formName">Cover Picture:</span>
            <input
              className="email"
              name="coverURL"
              placeholder="cover image url"
              type="text"
            />
            <div className="blank3"></div>
          </div>
          <div className="emailBox mod">
            <span className="formName">Favorite Coffee:</span>
            <input
              className="email"
              name="favorite"
              type="text"
              placeholder="Coffee"
            />
            <div className="blank3"></div>
          </div>
          <div className="emailBox mod">
            <span className="formName">Coffee Picture:</span>
            <input
              className="email"
              name="coffeeURL"
              placeholder="favorite coffee url"
              type="text"
            />
            <div className="blank3"></div>
          </div>
          <button className="signupPage" name="button1">
            Save
          </button>
        </form>
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
            <h2>
              {realUser ? (realUser.firstName||realUser.displayName) + " " + realUser.lastName : ""}
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
