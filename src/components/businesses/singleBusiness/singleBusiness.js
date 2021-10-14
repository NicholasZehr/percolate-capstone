import React, { Component } from "react";
import { connect } from "react-redux";

import { fetchBusiness } from "../../../store/businessActions";

class Business extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.fetchBusiness('07jxOivhASHm1AQVWVqf');
    console.log(this.props.business)
  }

  render() {
      const business = this.props.business.data()
      console.log(business)

      return (
        <div>
            <div>Business:
              {business.name}
              <div>
              Location:
              {Object.values(business.location).map(item=><h1>{item}</h1>)}
              </div>
              <div>
              Contact Info: <br/>
              {business.phone} <br/>
              {business.email}
              </div>
              {business.followers.length} followers
              <img alt="Cover Pic" src={business.coverImageUrl} />
              <img alt="Profile Pic"src={business.imageUrl} />

            </div>
        </div>
      );
      }
}

const mapState = (state) => {
  return {
    business: state.businesses.business,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchBusiness: (businessId) => dispatch(fetchBusiness(businessId)),
  };
};

export default connect(mapState, mapDispatch)(Business);
