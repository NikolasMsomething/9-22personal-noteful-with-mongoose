const express = require('express');
const router = express.Router();
const Folder = require('../models/folder');
const mongoose = require('mongoose');

//GET to /api/folders

router.get('/', (req, res, next) => {
  return Folder.find()
    .then((folders) => {
      res.status(200).json(folders);
    }).catch(err => {
      next(err);
    });
});

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

  

module.exports = router;