import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';
import { fetchUser } from '../../store/Actions/usersActions';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const SingleUserPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  //componentDidMount here
  const auth = getAuth()
  const [user, setUser] = useState(getAuth().currentUser);
  const realUser = useSelector(state=> state.users.user)
  onAuthStateChanged(auth, (u) => {
    setUser(u);
    console.log(user,realUser)
  });
  useEffect(() => {
    async function fetchData() {
      //* Fetch the user using it's id
      await dispatch(fetchUser(user?user.uid:{}));
    }
    fetchData();
  }, []);

  return (
    <div className="singleUserPageBox">
      <div className="profileBox">
        <div className="profileCover">
          <div className="shadow">
            <img
              className="cover"
              src="https://i.pinimg.com/originals/1b/e1/b8/1be1b8df06dd6c392696589402cf26af.jpg"
            />
          </div>
        </div>
        <div className="profilePicNavBox">
          <div className="blank2"></div>
          <img
            className="profPic ownpage"
            src={user ? user.photoURL : '/guest.jpeg'}
          />
          <div className="profileNavBar">
            <h2>{user? user.displayName+' '+realUser.lastName:''}</h2>
            <hr className="divider" />
            <div className="menu">
              <div>Reviews</div>
              <div>About</div>
              <div>Friends</div>
              <div>Photos</div>
            </div>
          </div>
          <div className="blank2"></div>
        </div>
      </div>
      <div className="body">
        <div className="leftBody"></div>
        <div className="rightBody"></div>
      </div>
    </div>
  );
};
export default SingleUserPage;
