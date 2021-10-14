/*eslint jsx-quotes: ["error", "prefer-single"]*/
import React from 'react';
import { connect } from 'react-redux';
import { addReview } from '../../store/reviewActions';

export class EditStudent extends React.Component {
  constructor() {
    super();
    this.errors = [];
    this.state = {
      businessId: '',
      coffeeId: '',
      rating: 0.0,
      reviewContent: '',
      userId: '',
      username: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateInput = this.validateInput.bind(this);
  }

  componentDidUpdate(prevProps) {}

  handleSubmit(event) {
    const { ...review } = this.state;
    event.preventDefault();
    let newReview = {
      businessId: review.businessId ? review.businessId : null,
      coffeeId: review.coffeeId ? review.coffeeId : null,
      likeCount: 0,
      rating: review.rating,
      reviewContent: review.reviewContent,
      userId: review.userId,
      username: review.userId,
    };
    this.props.addReview(newReview);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    const student = this.state;
    return (
      <form
        id='form_student_new'
        className='form-student-new'
        onSubmit={this.handleSubmit}
      >
        <div className='form-input-submit-group'>
          {this.state.error ? (
            <h3 className='error-label'>{this.state.error}</h3>
          ) : null}
          <label htmlFor='firstName'>First Name</label>
          <input
            className='form-text-box'
            type='text'
            name='firstName'
            value={student.firstName}
            placeholder='First Name'
            onChange={this.handleChange}
            onSelect={this.handleChange}
          />
          <label htmlFor='lastName'>Last Name</label>
          <input
            className='form-text-box'
            type='text'
            name='lastName'
            value={student.lastName}
            placeholder='Last Name'
            onChange={this.handleChange}
            onSelect={this.handleChange}
          />
          <label htmlFor='email'>Email</label>
          <input
            className='form-text-box'
            type='text'
            name='email'
            value={student.email}
            placeholder='E-mail'
            onChange={this.handleChange}
            onSelect={this.handleChange}
          />
          <label htmlFor='imageUrl'>Image Url</label>
          <input
            className='form-text-box'
            type='text'
            name='imageUrl'
            value={student.imageUrl}
            placeholder='Image URL'
            onChange={this.handleChange}
            onSelect={this.handleChange}
          />
          <label htmlFor='gpa'>GPA</label>
          <input
            className='form-text-box'
            type='text'
            name='gpa'
            value={student.gpa}
            placeholder='GPA'
            onChange={this.handleChange}
            onSelect={this.handleChange}
          />
          <button className='submit-button' type='submit'>
            Submit Edit
          </button>
        </div>
      </form>
    );
  }
}

const mapDispatch = (dispatch) => ({
  addReview: (review) => dispatch(addReview(review)),
});

export default connect(null, mapDispatch)(EditStudent);
