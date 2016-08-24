import React, { Component } from 'react';
import AnimalStore from '../stores/AnimalStore';
import PersonStore from '../stores/PersonStore';
import PersonActions from '../actions/PersonActions';

export default class App extends Component {
  constructor(props) {
    super(props);

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
  }

  render() {
    return (
      <h1>Test</h1>
    )
  }
}
