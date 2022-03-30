import React, { useEffect, useRef } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { fetchBusinesses } from "../../../store/businessActions";



const Businesses = (props) => {
  const businesses = useSelector((state) => state.businesses)
  const hasFetchedData = useRef(false)
  const dispatch = useDispatch();
  useEffect(() => {
    if (!hasFetchedData.current) {
      dispatch(fetchBusinesses)
    }
  }, [dispatch])
  
  return ( 
      businesses.length ? (
          <div>
            {businesses.map((business) => (
              <div>
                {business.data().name} {business.id}
              </div>
            ))}
          </div>
        )
      : (<div>No bussineses to display.</div> )
  )
}

const mapState = (state) => {
  return {
    businesses: state.businesses,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchBusinesses: () => dispatch(fetchBusinesses()),
  };
};

export default connect(mapState, mapDispatch)(Businesses);
