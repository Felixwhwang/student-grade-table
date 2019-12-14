import React from 'react';
import GradeTable from './grade-table';
import GradeForm from './grade-form';
import Header from './header';
import EditModal from './edit-modal';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      selectStudent: null
    };
  }
  componentDidMount() {
    this.getAllStudents();
  }
  getAverageGrades() {
    const grades = this.state.data;
    const totalGrades = grades.reduce((avg, cur) => avg + cur.grade, 0);
    return (totalGrades / grades.length).toFixed();
  }
  getAllStudents() {
    fetch('/api/grades')
      .then(res => res.json())
      .then(data => {
        this.setState({ data });
      }).catch(err => alert('getAllStudents Error: ', err));
  }
  addGrade(grade) {
    const req = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(grade)
    };
    fetch('/api/grades', req)
      .then(res => res.json())
      .then(grade => {
        this.setState({ data: this.state.data.concat(grade) });
      }).catch(err => alert('addGrade Error: ', err));
  }
  deleteGrade(event) {
    let data = this.state.data;
    let currentStudent = null;
    for (let index = 0; index < data.length; index++) {
      if (data[index].id === parseInt(event.target.id)) {
        currentStudent = data[index];
        data.splice(index, 1);
        break;
      }
    }
    const req = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(currentStudent)
    };
    fetch(`/api/grades/${parseInt(event.target.id)}`, req)
      .then(res => res.json())
      .then(grade => {
        this.setState({ data });
      }).catch(err => alert('deleteGrade Error: ', err));
  }
  getEditGrade(event) {
    const id = parseInt(event.target.id);
    for (let index = 0; index < this.state.data.length; index++) {
      if (this.state.data[index].id === id) {
        let newData = this.state.data[index];
        newData.id = id;
        this.setState({
          selectStudent: newData
        });
      }
    }
  }
  editGrade(grade, id) {
    const data = this.state.data.map(cur => {
      if (cur.id === id) {
        cur.name = grade.name;
        cur.course = grade.course;
        cur.grade = grade.grade;
      }
      return cur;
    });

    const req = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(grade)
    };
    fetch(`/api/grades/${id}`, req)
      .then(res => res.json())
      .then(grade => {
        this.setState({ data });
      }).catch(err => alert('editGrade Error: ', err));
  }

  render() {
    return (
      <div className="container">
        <Header avgGrades={this.getAverageGrades()} />
        <div className="row">
          <GradeForm addGrade={this.addGrade.bind(this)} />
          <GradeTable
            data={this.state.data}
            deleteGrade={this.deleteGrade.bind(this)}
            getEditGrade={this.getEditGrade.bind(this)}/>
        </div>
        <EditModal selectStudent={this.state.selectStudent} editGrade={this.editGrade.bind(this)}/>
      </div>
    );
  }
}

export default App;
