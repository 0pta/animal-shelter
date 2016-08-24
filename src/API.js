import ServerActions from './actions/ServerActions';
import axios from 'axios';

const API = {
  getAnimals() {
    axios.get('/api/animals')
      .then(res => ServerActions.receiveAnimals(res.data))
      .catch(console.error);
  },
  getAnimal(id) {
    axios.get(`/api/animals/${id}`)
      .then(res => ServerActions.receiveAnimal(res.data))
      .catch(console.error);
  },
  getPeople() {
    axios.get('/api/people')
      .then(res => ServerActions.receivePeople(res.data))
      .catch(console.error);
  },
  addOwner(animalId, personId) {
    axios.put(`/api/animals/${animalId}/addOwner/${personId}`)
      .then(res => ServerActions.receiveAnimal(res.data))
      .catch(console.error);
  }
}

export default API;
