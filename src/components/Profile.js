import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import AnimalStore from '../stores/AnimalStore';
import PersonStore from '../stores/PersonStore';
import PersonActions from '../actions/PersonActions';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      animal: PersonActions.getAnimal(this.props.params.animalId),
      people: PersonActions.getPeople(),
      showModal: false,
      draftOwner: ""
    }

    this._onChange = this._onChange.bind(this);
    this._addOwner = this._addOwner.bind(this);
    this._openModal = this._openModal.bind(this);
    this._closeModal = this._closeModal.bind(this);
    this._onInputChange = this._onInputChange.bind(this);
    this._selectOwner = this._selectOwner.bind(this);
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
    this.setState({
      animal: AnimalStore.getAnimal(),
      people: PersonStore.getPeople()
    })
  }

  _addOwner(e) {
    e.preventDefault();
    PersonActions.addOwner(this.props.params.animalId, this.state.draftOwner);
    this.setState({showModal: false, animal: PersonActions.getAnimal(this.props.params.animalId)});
  }

  _openModal(e) {
    e.preventDefault();
    this.setState({showModal: true});
  }

  _closeModal(e) {
    e.preventDefault();
    this.setState({showModal: false});
  }

  _onInputChange(e) {
    e.preventDefault();
  }

  _selectOwner(e) {
    e.preventDefault();
    this.setState({draftOwner: e.target.getAttribute('data-id')});
  }

  render() {
    if (this.state.animal) {
      if (this.state.people) {
        const Persons = this.state.people.map(person => {
          return (
            <li key={person._id} onClick={this._selectOwner}><a data-id={person._id} href="#">{person.name}</a></li>
          )
        })

        var Owner;
        if (this.state.animal.owner) {
          Owner = <h5>Owner: {this.state.animal.owner.name}</h5>
        } else {
          Owner = <h5>Not adopted yet. Please adopt!</h5>
        }

        return (
          <div className="container">
            <h3>Animal Details</h3>
            <h5>Name: {this.state.animal.name}</h5>
            <h5>Type: {this.state.animal.type}</h5>
            <h5>Age: {this.state.animal.age}</h5>
            <h5>Gender: {this.state.animal.gender}</h5>
            {Owner}
            <button onClick={this._openModal} className="btn btn-default btn-sm">Adopt</button>

            <Modal show={this.state.showModal} onHide={this._closeModal}>
              <Modal.Header closeButton>
                <Modal.Title>Add Owner</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="dropdown">
                  <button className="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">Select Owner
                  <span className="caret"></span></button>
                  <ul className="dropdown-menu">
                    {Persons}
                  </ul>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button className="btn btn-success" onClick={this._addOwner}>Save</Button>
                <Button onClick={this._closeModal}>Close</Button>
              </Modal.Footer>
            </Modal>

          </div>
        )
      }

    } else {
      return (
        <h1>Loading...</h1>
      )
    }
  }
}
