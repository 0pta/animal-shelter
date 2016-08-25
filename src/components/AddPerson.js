import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import PersonActions from '../actions/PersonActions';

export default class AddPerson extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      name: "",
      email: ""
    }

    this._openModal = this._openModal.bind(this);
    this._closeModal = this._closeModal.bind(this);
    this._nameChange = this._nameChange.bind(this);
    this._emailChange = this._emailChange.bind(this);
    this._addPerson = this._addPerson.bind(this);
  }

  _openModal(e) {
    e.preventDefault();
    this.setState({showModal: true});
  }

  _closeModal(e) {
    e.preventDefault();
    this.setState({showModal: false});
  }

  _nameChange(e) {
    this.setState({name: e.target.value});
  }

  _emailChange(e) {
    this.setState({email: e.target.value});
  }

  _addPerson(e) {
    let newPerson = {
      name: this.state.name,
      email: this.state.email
    }
    PersonActions.createPerson(newPerson);
    this._closeModal(e);
  }

  render() {
    return (
      <div>
        <button className="btn btn-success btn-md" onClick={this._openModal}>Add Person</button>

        <Modal show={this.state.showModal} onHide={this._closeModal}>
        <form className="form-group">
          <Modal.Header closeButton>
            <Modal.Title>Add Owner</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <label>Name: <input type="text" onChange={this._nameChange} required/></label>
              <label>Email: <input type="text" onChange={this._emailChange} required/></label>
          </Modal.Body>
          <Modal.Footer>
            <Button className="btn btn-success" onClick={this._addPerson}>Add</Button>
            <Button onClick={this._closeModal}>Close</Button>
          </Modal.Footer>
          </form>
        </Modal>
      </div>
    )
  }
}
