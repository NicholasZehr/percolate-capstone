import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {fetchUser} from '../store/Actions/usersActions'
import { logout } from '../store/auth';

const Header = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const isLoggedIn = useSelector((state) => state.auth.accessToken);
  const user = useSelector(state=>state.user)
  useEffect(_ => {
    dispatch(fetchUser(auth.uid))
  },[])
  console.log('user', user? user.lastName:'not yet')
  return (
    <div className="header">
      <div className="header-navbar">
        <div className="oursite" onClick={() => history.push('/home')}>
          <span className="brand">Percolate</span>
          <img
            className="logo"
            src={process.env.PUBLIC_URL + '/logo.png'}
            onClick={() => history.push('/home')}
          />
        </div>

        <div className="blank">
          <div className="about" onClick={(_) => history.push('/about')}>
            About
          </div>
          <div className="about" onClick={(_) => history.push('/contact')}>
            <div>Contact Us</div>
          </div>
          <div className="space"></div>
        </div>
        <div className="search">
          <input className="search-input" placeholder="Search Coffee | location | zip code" />
          <div className="search-label">Search</div>
        </div>
        <div className="blank"></div>
          <div className="loginBox" onClick={() => history.push('/user/id')}>
            <div className="imageBox">
              <img
                className="profPic"
                src={process.env.PUBLIC_URL + '/Nobi.png'}
              />
            </div>
            <div>
              <span className='userName'>{user? user.lastName:'Sign in'}</span>
            </div>
        </div>
      </div>
    </div>
  );
};


export default Header;
