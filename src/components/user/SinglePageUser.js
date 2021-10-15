import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';
import { fetchUser } from '../../store/Actions/usersActions';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const SingleUserPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  // componentDidMount here
  // const user = getAuth().currentUser
  // console.log(user)
  // useEffect(() => {
  //   async function fetchData() {
  //     //* Fetch the user using it's id
  //     await dispatch(fetchUser(user.uid));
  //   }
  //   fetchData();
  // }, []);

  return (
    <div className="singleUserPageBox">
      <div className="profileBox">
        <div className="profileCover">cover</div>
        <div className='profilePicNavBox'>
          <img />
          <div className='profileNavBar'>
            <div>Reviews</div>
            <div>About</div>
            <div>Friends</div>
            <div>Photos</div>
          </div>
        </div>
      </div>
      <div className="body"><div className='leftBody'></div><div className='rightBody'></div></div>
    </div>
  );
};
export default SingleUserPage;
