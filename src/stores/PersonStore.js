import { EventEmitter } from 'events';
import AppDispatcher from '../AppDispatcher';

let _people;

class PersonStore extends EventEmitter {
  constructor() {
    super();

    AppDispatcher.register(action => {
      switch(action.type) {
        case 'RECEIVE_PEOPLE':
        _people = action.people;
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

  getPeople() {
    console.log ('_people:', _people);
    return _people;
  }
}

export default new PersonStore();
