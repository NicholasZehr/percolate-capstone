import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../store/auth";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Search } from "../components/Search";

const Header = () => {
  const history = useHistory();
  const login = getAuth();
  const dispatch = useDispatch();
  const [user, setUser] = useState(getAuth().currentUser);
  onAuthStateChanged(login, (u) => {
    setUser(u);
  });
  function gotoPage() {
    if (user) {
      history.push(`/users/${user.uid}`);
    } else {
      history.push("/login");
    }
  }
  return (
    <div className='header'>
      <div className='header-navbar'>
        <div className='header-left'>
        <div className='oursite' onClick={() => history.push("/home")}>
          <span className='brand'>Percolate</span>
          <img
            className='logo'
            onClick={() => history.push("/home")}
            alt='Percolate Logo'
            src={"/logo.png"}
          />
        </div>

        <div className='blank'>
          <div className='about' onClick={(_) => history.push("/about")}>
            About
          </div>
          <div className='about' onClick={(_) => history.push("/contact")}>
            <div>Contact Us</div>
          </div>
          <div className='space'></div>
        </div>
        </div>
        <div className="header-middle">
          <Search className="search"/>
        </div>
        <div className="header-right">
        <div className="loginBox" onClick={gotoPage}>
          <div className="imageBox">
            <img
              className='profPic'
              alt='User Profile AVI'
              src={user ? user.photoURL || "/guest.jpeg" : "/guest.jpeg"}
            />
          </div>
          <div className='username'>
            {user ? (
              <div>
                {user.displayName}
                <div
                  className='signoutButton'
                  onClick={() => dispatch(logout())}
                >
                  Sign out
                </div>
              </div>
            ) : (
              "Sign in"
            )}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Header;
