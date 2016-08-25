import React, { Component } from 'react';
import { Link } from 'react-router';
import { Modal, Button } from 'react-bootstrap';
import AnimalStore from '../stores/AnimalStore';
import PersonStore from '../stores/PersonStore';
import PersonActions from '../actions/PersonActions';

export default class AddPerson extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false
    }

    this._openModal = this._openModal.bind(this);
    this._closeModal = this._closeModal.bind(this);
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

  _addPerson(e) {
    e.preventDefault();
    this.setState({showModal: false});
  }

  render() {
    return (
      <div>
        <button className="btn btn-primary" onClick={this._openModal}>Add Person</button>

        <Modal show={this.state.showModal} onHide={this._closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add Person to Adopt</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="form-group" onSubmit={this._addPerson}>
              <label>Name: <input type="text" required/></label>
              <label>Email: <input type="text" /></label>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button className="btn btn-success" onClick={this._addPerson}>Add</Button>
            <Button onClick={this._closeModal}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}
