import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';
import {fetchUser} from '../../store/Actions/usersActions'

const SingleUserPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  // componentDidMount here
  const userId = useSelector((state) => state.auth.uid);
  useEffect(() => {
    async function fetchData() {
      //* Fetch the user using it's id
      await dispatch(fetchUser(userId));
    }
    fetchData();
  }, []);

  


  return <div>Hello world! single user page</div>;
};
export default SingleUserPage;
