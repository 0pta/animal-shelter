import API from '../API';

const PersonActions = {
  getAnimals() {
    API.getAnimals();
  },
  getAnimal(id) {
    API.getAnimal(id);
  },
  addAnimal(animalObj) {
    API.addAnimal(animalObj);
  },
  removeAnimal(id) {
    API.removeAnimal(id);
  },
  getPeople() {
    API.getPeople();
  },
  getPerson(id) {
    API.getPerson(id);
  },
  createPerson(obj) {
    API.createPerson(obj);
  },
  deletePerson(id) {
    API.deletePerson(id);
  },
  addOwner(animalId, personId) {
    API.addOwner(animalId, personId);
  },
  removeOwner(id) {
    API.removeOwner(id);
  }
}

export default PersonActions;
