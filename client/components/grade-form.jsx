import React from 'react';

class InputRow extends React.Component {
  render() {
    const faName = this.props.faName;
    const name = this.props.name;
    const value = this.props.value;
    const inputChange = this.props.handleInputChange;
    return (
      <div className="form-group input-group">
        <span className="input-group-prepend">
          <span className="input-group-text"><i className={faName}></i></span>
        </span>
        <input
          autoComplete="off"
          type="text"
          className="form-control form-rounded"
          value={value}
          name={name}
          onChange={inputChange}
          placeholder={name}
        ></input>
      </div>
    );
  }
}

export default class GradeForm extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      course: '',
      grade: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  handleSubmit(event) {
    const student = {
      name: this.state.name,
      course: this.state.course,
      grade: parseInt(this.state.grade)
    };
    this.props.addGrade(student);
    this.handleCancel();
    event.preventDefault();
  }
  handleCancel() {
    this.setState({
      name: '',
      course: '',
      grade: ''
    });
  }
  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)} className="col-md-3">
        <InputRow faName='fas fa-user' name='name' value={this.state.name}
          handleInputChange={this.handleInputChange}/>
        <InputRow faName='fas fa-book' name='course' value={this.state.course}
          handleInputChange={this.handleInputChange}/>
        <InputRow faName='far fa-copy' name='grade' value={this.state.grade}
          handleInputChange={this.handleInputChange}/>
        <button type="submit" className="btn btn-success">Add</button>
        <button
          type="button"
          className="btn btn-warning ml-2"
          id="cancelButton"
          onClick={this.handleCancel.bind(this)}>Clear</button>
      </form>
    );
  }
}
