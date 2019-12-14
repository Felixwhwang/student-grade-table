import React from 'react';

class InputRow extends React.Component {
  render() {
    return (
      <div className="form-group input-group">
        <span className="input-group-prepend">
          <span className="input-group-text"><i className={this.props.faName}></i></span>
        </span>
        <input
          name={this.props.name}
          autoComplete="off"
          type="text"
          className="form-control form-rounded"
          value={this.props.value}
          onChange={this.props.handleInputChange}
        ></input>
      </div>
    );
  }
}

export default class EditModal extends React.Component {
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
    this.props.editGrade(student, this.props.selectStudent.id);
    event.preventDefault();
  }
  handleClear() {
    this.setState({
      name: '',
      course: '',
      grade: ''
    });
  }
  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  componentDidUpdate(preProps) {
    if (this.props.selectStudent !== preProps.selectStudent) {
      this.setState({
        name: this.props.selectStudent.name,
        course: this.props.selectStudent.course,
        grade: this.props.selectStudent.grade
      });
    }
  }

  render() {
    return (
      <div className="modal fade" id="editmodal">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">Edit Information</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <InputRow faName='fas fa-user' name="name" value={this.state.name} handleInputChange={this.handleInputChange} />
              <InputRow faName='fas fa-book' name="course" value={this.state.course} handleInputChange={this.handleInputChange} />
              <InputRow faName='far fa-copy' name="grade" value={this.state.grade} handleInputChange={this.handleInputChange} />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.handleSubmit.bind(this)}
                data-dismiss='modal'>Save Changes</button>
              <button
                type="button"
                className="btn btn-warning ml-2"
                onClick={this.handleClear.bind(this)}>Clear</button>
              <button
                type="button"
                className="btn btn-secondary ml-2"
                data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
