import React, { Component } from "react";
import { connect } from "react-redux";

import { fetchBusiness } from "../../../store/businessActions";

class Business extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.fetchBusiness("07jxOivhASHm1AQVWVqf");
    console.log("shit be mounted");
  }

  render() {
    console.log("render business", this.props.business);
    const business = this.props.business;
    if (!business) {
      return <h2>loading..</h2>;
    }

    //const business = businessProps.data();
    return (
      <div class="single-business">
        <div class="business-info">
          <div class="cover-img">
            <img alt="Cover Pic" src={business.coverImageUrl} />
          </div>
          <div class="pro-pic">
            <img alt="Profile Pic" src={business.imageUrl} />
          </div>
          <div>
            Business:
            {business.name}
            {/* <div>
              Location:
              {Object.values(business.location).map((item) => (
                <h1>{item}</h1>
              ))}
            </div> */}
            <div>
              Contact Info: <br />
              {business.phone} <br />
              {business.email}
            </div>
            {/* {business.followers.length} followers */}
          </div>
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
