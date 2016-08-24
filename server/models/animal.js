const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
  name: {type: String, required: true},
  type: {type: String, required: true},
  age: {type: Number, required: true, min: 0},
  currentOwner: {type: mongoose.Schema.Types.ObjectId, ref: 'Person'},
  previousOwners: [{type: mongoose.Schema.Types.ObjectId, ref: 'Person'}]
});

animalSchema.statics.findAnimals = function(cb) {
  this
    .find({})
    .sort('name')
    .limit(5)
    .exec((err, animals) => {
      if (err) return cb(err);
      else cb(err, animals);
    })
}

const Animal = mongoose.model('Animal', animalSchema);

module.exports = Animal;
