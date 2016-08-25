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
  addAnimal(animal) {
    AppDispatcher.dispatch({
      type: 'ADD_ANIMAL',
      animal
    })
  },
  removeAnimal(animal) {
    AppDispatcher.dispatch({
      type: 'REMOVE_ANIMAL',
      animal
    })
  },
  receivePeople(people) {
    AppDispatcher.dispatch({
      type: 'RECEIVE_PEOPLE',
      people
    })
  },
  receivePerson(person) {
    AppDispatcher.dispatch({
      type: 'RECEIVE_PERSON',
      person
    })
  },
  createPerson(person) {
    AppDispatcher.dispatch({
      type: 'CREATE_PERSON',
      person
    })
  },
  deletePerson(person) {
    AppDispatcher.dispatch({
      type: 'DELETE_PERSON',
      person
    })
  }
}

export default ServerActions;
