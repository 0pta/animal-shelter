import React, { Component } from 'react';
import { Link } from 'react-router';
import { Modal, Button } from 'react-bootstrap';
import AnimalStore from '../stores/AnimalStore';
import PersonStore from '../stores/PersonStore';
import PersonActions from '../actions/PersonActions';

export default class AddAnimal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      name: "",
      type: "",
      age: 0,
      gender: "female",
      url: ""
    }

    this._openModal = this._openModal.bind(this);
    this._closeModal = this._closeModal.bind(this);
    this._nameChange = this._nameChange.bind(this);
    this._typeChange = this._typeChange.bind(this);
    this._genderChange = this._genderChange.bind(this);
    this._ageChange = this._ageChange.bind(this);
    this._urlChange = this._urlChange.bind(this);
    this._addAnimal = this._addAnimal.bind(this);
  }

  componentDidMount() {
    AnimalStore.startListening(this._onChange);
    PersonStore.startListening(this._onChange);
  }

  componentWillUnmount() {
    AnimalStore.stopListening(this._onChange);
    PersonStore.stopListening(this._onChange);
  }

  _openModal(e) {
    e.preventDefault();
    this.setState({showModal: true});
  }

  _closeModal(e) {
    e.preventDefault();
    this.setState({showModal: false});
  }

  _addAnimal(e) {
    e.preventDefault();
    let newAnimal = {
      name: this.state.name,
      type: this.state.type,
      age: this.state.age,
      gender: this.state.gender,
      picture: this.state.url
    }
    PersonActions.addAnimal(newAnimal);
    this.setState({showModal: false});
  }

  _nameChange(e) {
    this.setState({name: e.target.value});
  }

  _typeChange(e) {
    this.setState({type: e.target.innerText});
  }

  _ageChange(e) {
    this.setState({age: e.target.value});
  }

  _genderChange(e) {
    this.setState({gender: e.target.value});
  }

  _urlChange(e) {
    this.setState({url: e.target.value});
  }

  render() {
    return (
      <div>
        <button className="btn btn-primary" onClick={this._openModal}>Add Animal</button>

        <Modal show={this.state.showModal} onHide={this._closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add Animal to Directory</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="form-group" onSubmit={this._addAnimal}>
              <label>Name: <input onChange={this._nameChange} type="text" required/></label>
              <label>Type:
                <div className="dropdown">
                  <button className="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">Select Type
                  <span className="caret"></span></button>
                  <ul className="dropdown-menu">
                    <li onClick={this._typeChange}><a href="#">Cat</a></li>
                    <li onClick={this._typeChange}><a href="#">Dog</a></li>
                  </ul>
                </div>
              </label>
              <label>Age: <input onChange={this._ageChange} type="number" required/></label>
              <label>Gender:
                <label>Male <input name="gender" type="radio" value="male" onClick={this._genderChange}/></label>
                <label>Female <input name="gender" type="radio" value="female" onClick={this._genderChange}/></label>
              </label>
              <label>Picture URL: <input type="text" onChange={this._urlChange} required/></label>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button className="btn btn-success" onClick={this._addAnimal}>Add</Button>
            <Button onClick={this._closeModal}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}
