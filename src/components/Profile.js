import React, { Component } from 'react';
import { Link } from 'react-router';
import { Modal, Button } from 'react-bootstrap';
import AnimalStore from '../stores/AnimalStore';
import PersonStore from '../stores/PersonStore';
import PersonActions from '../actions/PersonActions';
import { browserHistory } from 'react-router';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      animal: PersonActions.getAnimal(this.props.params.animalId),
      people: PersonActions.getPeople(),
      showModal: false,
      draftOwner: ""
    }

    //this._onChange = this._onChange.bind(this);
    this._addOwner = this._addOwner.bind(this);
    this._openModal = this._openModal.bind(this);
    this._closeModal = this._closeModal.bind(this);
    this._onInputChange = this._onInputChange.bind(this);
    this._selectOwner = this._selectOwner.bind(this);
    this._removeAnimal = this._removeAnimal.bind(this);
    this._disassociate = this._disassociate.bind(this);

    this._onChange = () => {
        this.setState({
          animal: AnimalStore.getAnimal(this.props.params.animalId),
          people: PersonStore.getPeople()
        })
    }
  }

  componentDidMount() {
    AnimalStore.startListening(this._onChange);
    PersonStore.startListening(this._onChange);
  }

  componentWillUnmount() {
    AnimalStore.stopListening(this._onChange);
    PersonStore.stopListening(this._onChange);
  }

  // componentWillMount() {
  //   this.setState({animal: AnimalStore.getAnimal(this.props.params.animalId)});
  // }



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
    //this.setState({draftOwner: e.target.getAttribute('data-id')});
    PersonActions.addOwner(this.props.params.animalId, e.target.getAttribute('data-id'));
    this.setState({showModal: false, animal: PersonActions.getAnimal(this.props.params.animalId)});
    browserHistory.push('/');
  }

  //componentWillReceiveProps(nextProps) {
  // ClientActions.getPets(nextProps.params.type)
  //}

  _removeAnimal(e) {
    e.preventDefault();
    PersonActions.removeAnimal(this.props.params.animalId);
    browserHistory.push('/');
  }

  _disassociate(e) {
    e.preventDefault();
    PersonActions.removeOwner(this.props.params.animalId);
    this.setState({draftOwner: null})
    browserHistory.push('/');
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

        let path = '/';

        return (
          <div className="container">
            <Link to={path}><button className="btn btn-primary btn-sm">Search</button></Link>
            <h3>Animal Details</h3>
            <img src={this.state.animal.picture} width="400px" />
            <h5>Name: {this.state.animal.name}</h5>
            <h5>Type: {this.state.animal.type}</h5>
            <h5>Age: {this.state.animal.age}</h5>
            <h5>Gender: {this.state.animal.gender}</h5>
            {Owner}
            <div><button onClick={this._removeAnimal} className="btn btn-danger btn-sm">Remove from Listing</button></div>
            <button onClick={this._openModal} className="btn btn-default btn-sm">Adopt</button>
            <button onClick={this._disassociate} className="btn btn-default btn-sm">Unadopt</button>

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
