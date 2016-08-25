import React, { Component } from 'react';
import { Link } from 'react-router';
import AnimalStore from '../stores/AnimalStore';
import PersonStore from '../stores/PersonStore';
import PersonActions from '../actions/PersonActions';
import { browserHistory } from 'react-router';

export default class SelectPerson extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <h1>Test</h1>
    )
  }
}
