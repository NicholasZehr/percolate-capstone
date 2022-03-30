import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBusinesses } from "../../../store/businessActions";



const Businesses = (props) => {
  const businesses = useSelector((state) => state.businesses)
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(fetchBusinesses())
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

export default Businesses
