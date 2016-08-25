import React, { Component } from 'react';
import { Link } from 'react-router';
import AnimalStore from '../stores/AnimalStore';
import PersonStore from '../stores/PersonStore';
import PersonActions from '../actions/PersonActions';

import AddAnimal from './AddAnimal';
import SelectPerson from './SelectPerson';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      animals: null,
      people: null,
      person: null
    }

    this._onChange = this._onChange.bind(this);
    this._setPerson = this._setPerson.bind(this);
  }

  componentDidMount() {
    PersonActions.getAnimals();
    PersonActions.getPeople();
    AnimalStore.startListening(this._onChange);
    PersonStore.startListening(this._onChange);
  }

  componentWillUnmount() {
    AnimalStore.stopListening(this._onChange);
    PersonStore.stopListening(this._onChange);
  }

  _onChange() {
    this.setState({
      animals: AnimalStore.getAnimals(),
      people: PersonStore.getPeople(),
      person: PersonStore.getPerson()
    });
  }

  _setPerson(id) {
    PersonActions.getPerson(id);
    this.setState({person: PersonStore.getPerson()});
  }

  render() {
    if (this.state.animals) {
      const Animals = this.state.animals.map((value, index) => {
        let path = value._id;
        let Owned;
        if (value.owner) {
          Owned = <td>Adopted</td>
        } else {
          Owned = <td><button className="btn btn-primary btn-sm">Adopt</button></td>
        }
        return (
          <tr key={index}>
            <td>{value.type}</td>
            <td>{value.name}</td>
            <td>{value.age}</td>
            <td>{value.gender}</td>
            <td><img className="thumbnail" src={value.picture} width="200px" /></td>
            <td><Link to={path}><button className="btn btn-success btn-sm">Details</button></Link></td>
            {Owned}
          </tr>
        )
      })

      return (
        <div className="container">
          <h3>Shelter Directory</h3>
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
            <div className="dropdown col-sm-1 col-md-1 col-lg-1">
              <button className="btn btn-danger dropdown-toggle" type="button" data-toggle="dropdown">Age
              <span className="caret"></span></button>
              <ul className="dropdown-menu">
                <li><a href="#">0 to 2 years</a></li>
                <li><a href="#">2 to 5 years</a></li>
                <li><a href="#">5 years+</a></li>
              </ul>
            </div>
            <div className="dropdown col-sm-1 col-md-1 col-lg-1">
              <button className="btn btn-danger dropdown-toggle" type="button" data-toggle="dropdown">Status
              <span className="caret"></span></button>
              <ul className="dropdown-menu">
                <li><a href="#">Free</a></li>
                <li><a href="#">Adopted</a></li>
              </ul>
            </div>
            <div className="col-sm-5 col-md-5 col-lg-5">
              <AddAnimal/>
            </div>
            <div className="col-sm-3 col-md-3 col-lg-3">
              <SelectPerson people={this.state.people} person={this.state.person} setPerson={this._setPerson}/>
            </div>
          </div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Type</th>
                <th>Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Picture</th>
                <th>Details</th>
                <th>Status</th>
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
