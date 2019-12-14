import React from 'react';

export default class SearchName extends React.Component {
  constructor() {
    super();
    this.state = ({ name: '' });
  }
  handleSearch(event) {
    this.setState({ name: event.target.value });
    this.props.handleSearchName(event.target.value);
  }

  render() {
    return (
      <div className="mb-2">
        Search Name:
        <input type="text" value={this.state.name} placeholder="Search name" onChange={this.handleSearch.bind(this)}/>
      </div>
    );
  }
}
