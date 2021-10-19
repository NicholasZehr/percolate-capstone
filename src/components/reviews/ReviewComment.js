import React, { Component } from "react";
import { Link } from "react-router-dom";

class ReviewComment extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { username, userId, comment } = this.props.comment;
    return (
      <div className='single-comment-container'>
        <h2>Comments</h2>
        <div className='comment-list-item'>
          <div className='comment-username'>
            <Link to={`/users/${userId}`}>
              <h4 id='comment-username'>{username}</h4>
            </Link>
          </div>
          <hr className='solid' />
          <p id='content'>{comment}</p>
        </div>
      </div>
    );
  }
}

export default ReviewComment;
