import { EventEmitter } from 'events';
import AppDispatcher from '../AppDispatcher';

let _people;
let _person;

class PersonStore extends EventEmitter {
  constructor() {
    super();

    AppDispatcher.register(action => {
      switch(action.type) {
        case 'RECEIVE_PEOPLE':
          _people = action.people;
          this.emit('CHANGE');
          break;
        case 'RECEIVE_PERSON':
          _person = action.person;
          this.emit('CHANGE');
          break;
        case 'CREATE_PERSON':
          _people.push(action.person);
          this.emit('CHANGE');
          break;
        case 'DELETE_PERSON':
          let _newPeople = _people.filter(function(obj) {
            return obj._id !== action.person._id;
          })
          _people = _newPeople;
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
    return _people;
  }

  getPerson() {
    return _person;
  }
}

export default new PersonStore();
