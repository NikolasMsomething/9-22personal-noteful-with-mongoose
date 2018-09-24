const express = require('express'); //Require Express to create a router
const router = express.Router(); //Creates a router
const Folder = require('../models/folder'); //require the model/collection so we can access it once server spins up connection to DB
const mongoose = require('mongoose'); //require mongoose so we can do validation checks on IDs... DONT connect to db server in routers EVER

//ALWAYS REMEMBER 5 CRUD OPERATIONS

//GET to /api/folders

router.get('/', (req, res, next) => {
  return Folder.find()
    .then((folders) => {
      res.status(200).json(folders);
    }).catch(err => {
      next(err);
    });
});

//GET to /api/folders/:id

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  if(!(mongoose.Types.ObjectId.isValid(id))) {
    const err = new Error('This is not a valid ID');
    err.status = 404;
    next(err);
  }

  console.log(id);

  return Folder.findById(id)
    .then((folder) => {
      console.log(folder);
      res.status(200).json(folder);
    }).catch(err => {
      next(err);
    });
});

//POST to /api/folders/

router.post('/', (req, res, next) => {

  if(!('title' in req.body)) {
    const err = new Error('You need a title!');
    err.status = 404;
    next(err);
  }

  return Folder.create(req.body)
    .then((response) => {
      res.status(201).json(response);
    }).catch(err => {
      next(err);
    });
});

//PUT TO /api/folders/:id

router.put('/:id', (req, res, next) => {
  
  const { id } = req.params;
  

  const newFolderName = {
    title: `${req.body.title}`
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

  return Folder.findByIdAndUpdate(id, newFolderName, {new: true})
    .then(response => {
      res.status(201).json(response);
    }).catch(err => {
      next(err);
    });

  
});

router.delete('/:id', (req, res, next) => {
  const { id } = req.params;

  return Folder.findByIdAndRemove(id)
    .then((response) => {
      res.status(204).json(response);
    }).catch(err => {
      next(err);
    });
});
  

module.exports = router;