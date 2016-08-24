import React, { Component } from 'react';
import AnimalStore from 'AnimalStore';
import PerosnStore from 'PersonStore';
import PersonActions from 'PersonActions';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      animals: PersonActions.getAnimals()
    }
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {
    const Animals = this.state.animals.map((value, index) => {
      return (
        <tr>
          <td>{value.type}</td>
          <td>{value.name}</td>
          <td>{value.age}</td>
          <td>{value.gender}</td>
        </tr>
      )
    })

    return (
      <div>
        <h3>Search for an animal.</h3>
        <form className="form-group">
          <input type="text"/>
          <button className="btn btn-primary btn-sm">Search</button>
        </form>
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
            </tr>
          </thead>
          <tbody>
            {Animals}
          </tbody>
        </table>
      </div>
    )
  }
}
