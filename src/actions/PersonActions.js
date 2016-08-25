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
  addOwner(animalId, personId) {
    API.addOwner(animalId, personId);
  }
}

export default PersonActions;
