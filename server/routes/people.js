const express = require('express');
const router = express.Router();

const Person = require('../models/person');

// /api/people

router.route('/')
  .get((req, res) => {
    Person.find({}, (err, people) => {
      res.status(err ? 400: 200).send(err || people);
    })
  })
  .post((req, res) => {
    Person.create(req.body, (err, person) => {
      res.status(err ? 400: 200).send(err || person);
    })
  });

router.get('/:personId', (req, res) => {
  Person.findById(req.params.personId, (err, person) => {
    if (err || !person) {
      return res.status(400).send(err || 'Person was not found.');
    }
    res.send(person);
  })
})

router.delete('/:personId', (req, res) => {
  Person.findByIdAndRemove(req.params.personId, (err, person) => {
    if (err || !person) {
      return res.status(400).send(err || 'Person was not deleted.');
    }
    res.send(person);
  })
})

router.put('/:personId', (req, res) => {
  Person.findByIdAndUpdate(req.params.personId, {$set: req.body}, {new: true}, (err, person) => {
    if (err || !person) {
      return res.status(400).send(err || 'Person was not updated.');
    }
    res.send(person);
  })
})

module.exports = router;
