import React from 'react';

class Header extends React.Component {
  render() {
    const avgGrades = this.props.avgGrades;
    return (
      <div className="row">
        <h1 className="col-sm-6">Student Grade Table</h1>
        <div className="col-sm-6 d-flex align-items-end flex-row-reverse">
          <h4>Grade Average : <span className="badge badge-secondary">{avgGrades}</span></h4>
        </div>
      </div>
    );
  }
}

export default Header;
