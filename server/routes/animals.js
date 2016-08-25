const express = require('express');
const router = express.Router();

const Animal = require('../models/animal');

// /api/animals

router.route('/')
  .get((req, res) => {
    Animal.findAnimals((err, animals) => {
      res.status(err ? 400: 200).send(err || animals);
    })
  })
  // Animal.find({}, (err, animals) => {
  //   res.status(err ? 400: 200).send(err || animals);
  // }).sort('name').limits(5)

  // SAMSIES

  // .get((req, res) => {
  //   Animal
  //   .find({})
  //   .sort('name')
  //   .limit(5)
  //   .exec(err, animals) => {
  //     res.status(err ? 400: 200).send(err || animals);
  //   }
  // })
  .post((req, res) => {
    Animal.create(req.body, (err, animal) => {
      res.status(err ? 400: 200).send(err || animal);
    })
  })

router.get('/:id', (req, res) => {
  Animal.findById(req.params.id, (err, animal) => {
    if (err || !animal) {
      return res.status(400).send(err || 'Animal not found.');
    }

    res.send(animal);
  }).populate('owner')

//SAMSIES; just different syntax

    // Animal
    //   .findById(req.params.id)
    //   .populate('owner')
    //   .exec(err, animal) => {
    //     if (err || !animal) {
    //       return res.status(400).send(err || 'Animal not found.');
    //     }
    //   }
    //   res.send(animal);
    // })

})

router.put('/:animalId/removeOwner', (req, res) => {
  Animal.findById(req.params.animalId, (err, animal) => {
    if (err || !animal) {
      return res.status(400).send(err || 'Animal not found.');
    }

    animal.owner = null;

    // need to save or doesn't go to database at all
    animal.save((err, savedAnimal) => {
      res.status(err ? 400: 200).send(err || savedAnimal);
    });
  });
})

router.put('/:animalId/addOwner/:ownerId', (req, res) => {
  Animal.findById(req.params.animalId, (err, animal) => {
    if (err || !animal) {
      return res.status(400).send(err || 'Animal not found.');
    }

    let ownerId = req.params.ownerId
    //mongoose is smart enough to turn string into object id based on string conent
    animal.owner = ownerId;

    // need to save or doesn't go to database at all
    animal.save((err, savedAnimal) => {
      res.status(err ? 400: 200).send(err || savedAnimal);
    });
  });
})

router.delete('/:animalId', (req, res) => {
  Animal.findByIdAndRemove(req.params.animalId, (err, animal) => {
    if (err || !animal) {
      return res.status(400).send(err || 'Animal was not deleted.');
    }
    res.send(animal);
  })
})

router.put('/:animalId', (req, res) => {
  Animal.findByIdAndUpdate(req.params.animalId, {$set: req.body}, {new: true}, (err, animal) => {
    if (err || !animal) {
      return res.status(400).send(err || 'Animal was not updated.');
    }
    res.send(animal);
  })
})


module.exports = router;
