/*eslint jsx-quotes: ["error", "prefer-single"]*/
import React from 'react';
import { connect } from 'react-redux';
import { editSingleStudent } from '../redux/singleStudent';

export class EditStudent extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      imageUrl: '',
      gpa: 0.0,
      error: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateInput = this.validateInput.bind(this);
  }

  componentDidMount() {
    this.setState({
      id: this.props.student.id,
      firstName: this.props.student.firstName,
      lastName: this.props.student.lastName,
      email: this.props.student.email,
      imageUrl: this.props.student.imageUrl,
      gpa: this.props.student.gpa,
    });
  }

  componentDidUpdate(prevProps) {
    const form = document.getElementById('form_student_new');
    if (this.state.error && !form.classList.contains('form-student-error')) {
      form.classList.add('form-student-error');
    }
    if (prevProps.student.id !== this.props.student.id) {
      this.setState({
        id: this.props.student.id,
        firstName: this.props.student.firstName,
        lastName: this.props.student.lastName,
        email: this.props.student.email,
        imageUrl: this.props.student.imageUrl,
        gpa: this.props.student.gpa,
      });
    }
  }

  validateInput(firstName, lastName, email) {
    if (!firstName || !lastName || !email) {
      this.setState({
        error: 'You must provide a first name, last name, and e-mail address.',
      });
      return false;
    }
    return true;
  }

  handleSubmit(event) {
    event.preventDefault();
    let editedStudent = {
      id: this.state.id,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      gpa: this.state.gpa,
      imageUrl: this.state.imageUrl,
    };
    if (!editedStudent.imageUrl) {
      editedStudent = {
        id: editedStudent.id,
        firstName: editedStudent.firstName,
        lastName: editedStudent.lastName,
        address: editedStudent.address,
        description: editedStudent.description,
      };
    }
    if (
      this.validateInput(
        editedStudent.firstName,
        editedStudent.lastName,
        editedStudent.email
      )
    ) {
      this.props.editSingleStudent(editedStudent);
    }
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

const mapState = (state) => {
  return {
    student: state.singleStudent,
  };
};

const mapDispatch = (dispatch) => ({
  editSingleStudent: (student) => dispatch(editSingleStudent(student)),
});

export default connect(mapState, mapDispatch)(EditStudent);
