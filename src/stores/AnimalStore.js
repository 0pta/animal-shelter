import { EventEmitter } from 'events';
import AppDispatcher from '../AppDispatcher';

let _animals = [];
let _animal = {};

class AnimalStore extends EventEmitter {
  constructor() {
    super();

    AppDispatcher.register(action => {
      switch(action.type) {
        case 'RECEIVE_ANIMALS':
          _animals = action.animals;
          this.emit('CHANGE');
          break;
        case 'RECEIVE_ANIMAL':
          _animal = action.animal;
          this.emit('CHANGE');
          break;
        case 'ADD_ANIMAL':
          _animals.push(action.animal);
          this.emit('CHANGE');
          break;
        case 'REMOVE_ANIMAL':
          _animal = {};
          this.emit('CHANGE');
          break;
      }
    });
  }

  startListening(cb) {
    this.on('CHANGE', cb);
  }

  stopListening(cb) {
    this.removeListener('CHANGE', cb);
  }

  getAnimals() {
    return _animals;
  }

  getAnimal() {
    return _animal;
  }
}

export default new AnimalStore();
