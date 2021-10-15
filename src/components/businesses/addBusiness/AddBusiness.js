import React, { Component } from "react";
import { connect } from "react-redux";
import { addBusiness } from "../../../store/businessActions";

class AddBusiness extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      phone: '',
      follower: 0
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.createProduct({ ...this.state});
  }

  render() {
    const {name, description, price} = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <div id="new-product">
          <input
            type="text"
            name="name"
            placeholder="name..."
            value={name}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone..."
            value={description}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="email"
            placeholder="Email..."
            value={price}
            onChange={this.handleChange}
          />
          <span>
            <button type="submit">
              Submit
            </button>
          </span>
        </div>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addBusiness: (business) => dispatch(AddBusiness(business))
  };
};

export default connect(null, mapDispatchToProps)(AddBusiness);
