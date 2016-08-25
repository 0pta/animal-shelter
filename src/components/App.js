import React, { Component } from 'react';
import { Route, Router, browserHistory } from 'react-router';

import Search from './Search';
import Profile from './Profile';
import AddPerson from './AddPerson';

export default class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path='/' component={Search} />
        <Route path='/:animalId' component={Profile} />
        <Route path='/addPerson/:personId' component={AddPerson} />
      </Router>
    )
  }
}
