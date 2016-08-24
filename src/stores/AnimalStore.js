import { EventEmitter } from 'events';
import AppDispatcher from '../AppDispatcher';

let _animals = [];

class AnimalStore extends EventEmitter {
  constructor() {
    super();

    AppDispatcher.register(action => {
      switch(action.type) {
        case 'RECEIVE_ANIMALS':
        _animals = action.animals;
        this.emit('CHANGE');
        break;
      }
    });
  }

  startListening(cb) {
    this.on('CHANGE', cb);
  }

  stopListening(cb) {
    this.on('CHANGE', cb);
  }

  getAnimals() {
    return _animals;
  }
}

export default new AnimalStore();
