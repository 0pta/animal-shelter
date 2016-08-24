import AppDispatcher from '../AppDispatcher';

const ServerActions = {
  receiveAnimals(animals) {
    AppDispatcher.dispatch({
      type: 'RECEIVE_ANIMALS',
      animals
    })
  }
}

export default ServerActions;
