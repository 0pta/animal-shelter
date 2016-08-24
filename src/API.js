import ServerActions from './actions/ServerActions';
import axios from 'axios';

const API = {
  getAnimals() {
    axios.get('/api/animals')
      .then(res => ServerActions.receiveAnimals(res.data))
      .catch(console.error);
  }
}

export default API;
