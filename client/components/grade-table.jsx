import React from 'react';
import SearchName from './search-name';

class TableGradeRow extends React.Component {
  render() {
    const student = this.props.student;
    return (
      <tr className="row">
        <td className="col-4">{student.name}</td>
        <td className="col-3">{student.course}</td>
        <td className="col-2">{student.grade}</td>
        <td className="col-3">
          <button
            className="btn btn-danger"
            id={student.id}
            onClick={this.props.deleteGrade}>Delete</button>
          <button
            type="button"
            className="btn btn-dark ml-2"
            data-toggle="modal"
            data-target="#editmodal"
            data-backdrop="static"
            data-keyboard="false"
            id={student.id}
            onClick={this.props.getEditGrade}>Edit</button>
        </td>
      </tr>
    );
  }
}

class GradeTable extends React.Component {
  constructor() {
    super();
    this.state = ({
      filterName: ''
    });
  }
  handleSearchName(name) {
    this.setState({ filterName: name });
  }
  render() {
    const grades = this.props.data;
    let rows = [];
    grades.forEach(student => {
      if (student.name.indexOf(this.state.filterName) === -1) return;
      rows.push(<TableGradeRow
        student={student}
        key={student.name}
        deleteGrade={this.props.deleteGrade}
        getEditGrade={this.props.getEditGrade}/>);
    });

    return (
      <div className="col-md-9">
        <SearchName handleSearchName={this.handleSearchName.bind(this)}/>
        <table className="table table-bordered table-striped table-fixed table-hover row">
          <thead className="thead-dark col-12">
            <tr className="row">
              <th className="col-4">Student Name</th>
              <th className="col-3">Course</th>
              <th className="col-2">Grade</th>
              <th className="col-3">Operations</th>
            </tr>
          </thead>
          <tbody className="col-12">{rows}</tbody>
        </table>
      </div>
    );
  }
}

export default GradeTable;
