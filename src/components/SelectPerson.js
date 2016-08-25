import React, { Component } from 'react';
import { Link } from 'react-router';
import AnimalStore from '../stores/AnimalStore';
import PersonStore from '../stores/PersonStore';
import PersonActions from '../actions/PersonActions';
import { browserHistory } from 'react-router';

export default class SelectPerson extends Component {
  constructor(props) {
    super(props);

    // this._onChange = this._onChange.bind(this);
  }

  // componentDidMount() {
  //   // PersonActions.getPeople();
  //   // PersonStore.on('CHANGE', this._onChange);
  //   // PersonStore.startListening(this._onChange);
  //   AnimalStore.startListening(this._onChange);
  // }
  //
  // componentWillUnmount() {
  //   // PersonStore.stopListening(this._onChange);
  //   AnimalStore.stopListening(this._onChange);
  // }
  //
  // _onChange() {
  //   console.log ('PersonStore.getPeople():', PersonStore.getPeople())
  //   this.setState({people: PersonStore.getPeople()});
  // }

  render() {
    if (this.props.people) {
      console.log ('this.props.people:', this.props.people);
      const Persons = this.props.people.map(person => {
        return (
          <li key={person._id}><a data-id={person._id} href="#">{person.name}</a></li>
        )
      })
      return (
        <div>
          <div className="dropdown">
            <button className="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">Select Adopter
            <span className="caret"></span></button>
            <ul className="dropdown-menu">
              {Persons}
            </ul>
          </div>
        </div>
      )
    } else {
      return (
        <h1>Loading...</h1>
      )
    }
  }
}
