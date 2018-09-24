'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Note = require('../models/note');


/* ========== GET/READ ALL ITEMS ========== */
router.get('/', (req, res, next) => {

  const { searchTerm } = req.query;
  console.log(searchTerm);
  //creates a regular expression with case insensitive 
  const re = new RegExp(searchTerm, 'gi');

  if(searchTerm) {
    return Note.find({$or: [{title: re}, {content: re}]}).sort({title: -1})
      .then((results) => {
        console.log(results);
        res.json(results);
      }).catch(err => {
        next(err);
      });
  }

  return Note.find()
    .then((results) => {
      console.log(results);
      res.json(results);
    }).catch(err => {
      next(err);
    });
  
});

/* ========== GET/READ A SINGLE ITEM ========== */
router.get('/:id', (req, res, next) => {

  const { id } = req.params;



  return Note.findById(id)
    .then((note) => {
      res.json(note);
    }).catch(error => {
      const err = new Error('This ID wasnt found!');
      err.status = 404;
      next(err);
    });
  
});

/* ========== POST/CREATE AN ITEM ========== */
router.post('/', (req, res, next) => {


  const { id } = req.params;

  const newObj = {
    title: req.body.title,
    content: req.body.content
  };

  if(!('title' in req.body)) {
    const err = new Error('You need a title!');
    err.status = 404;
    next(err);
  }

  if(!(mongoose.Types.ObjectId.isValid(id))) {
    const err = new Error('Not a valid id!');
    err.status = 404;
    next(err);
  }

  return Note.create(newObj)
    .then(response => {
      res.status(200).json(response);
    }).catch(err => {
      next(err);
    });

});

/* ========== PUT/UPDATE A SINGLE ITEM ========== */
router.put('/:id', (req, res, next) => {

  const updateValues = {
    title: req.body.title,
    content: req.body.content
  };

  if(!('title' in req.body)) {
    const err = new Error('You need a title!');
    err.status = 404;
    next(err);
  }

  return Note.findByIdAndUpdate(req.params.id, updateValues, {new: true})
    .then(response => {
      res.status(200).json(response);
    }).catch(err => {
      next(err);
    });
});

/* ========== DELETE/REMOVE A SINGLE ITEM ========== */
router.delete('/:id', (req, res, next) => {

  return Note.findByIdAndDelete(req.params.id)
    .then((response) => {
      res.status(204).end();
      console.log('item deleted!');
    }).catch(err => {
      next(err);
    });
});

module.exports = router;