import AppDispatcher from '../AppDispatcher';

const ServerActions = {
  receiveAnimals(animals) {
    AppDispatcher.dispatch({
      type: 'RECEIVE_ANIMALS',
      animals
    })
  },
  receiveAnimal(animal) {
    AppDispatcher.dispatch({
      type: 'RECEIVE_ANIMAL',
      animal
    })
  },
  receivePeople(people) {
    AppDispatcher.dispatch({
      type: 'RECEIVE_PEOPLE',
      people
    })
  }
}

export default ServerActions;
