import React, { Component } from 'react';
import { Link } from 'react-router';
import AnimalStore from '../stores/AnimalStore';
import PersonStore from '../stores/PersonStore';
import PersonActions from '../actions/PersonActions';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      animals: PersonActions.getAnimals()
    }

    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    AnimalStore.startListening(this._onChange);
    PersonStore.startListening(this._onChange);
  }

  componentWillUnmount() {
    AnimalStore.stopListening(this._onChange);
    PersonStore.stopListening(this._onChange);
  }

  _onChange() {
    this.setState({animals: AnimalStore.getAnimals()});
  }

  render() {

    if (this.state.animals) {
      const Animals = this.state.animals.map((value, index) => {
        let path = value._id;
        return (
          <tr key={index}>
            <td>{value.type}</td>
            <td>{value.name}</td>
            <td>{value.age}</td>
            <td>{value.gender}</td>
            <td><Link to={path}><button className="btn btn-success btn-sm">Details</button></Link></td>
          </tr>
        )
      })

      return (
        <div className="container">
          <h3>Search for an animal.</h3>
          <div className="row col-sm-12 col-md-12 col-lg-12">
            <div className="dropdown col-sm-1 col-md-1 col-lg-1">
              <button className="btn btn-danger dropdown-toggle" type="button" data-toggle="dropdown">Type
              <span className="caret"></span></button>
              <ul className="dropdown-menu">
                <li><a href="#">Cats</a></li>
                <li><a href="#">Dogs</a></li>
                <li><a href="#">Otters</a></li>
              </ul>
            </div>
            <div className="dropdown col-sm-1 col-md-1 col-lg-1">
              <button className="btn btn-danger dropdown-toggle" type="button" data-toggle="dropdown">Gender
              <span className="caret"></span></button>
              <ul className="dropdown-menu">
                <li><a href="#">Male</a></li>
                <li><a href="#">Female</a></li>
              </ul>
            </div>
          </div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Type</th>
                <th>Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {Animals}
            </tbody>
          </table>
        </div>
      )
    } else {
      return (
        <h1>Loading...</h1>
      )
    }

  }
}
