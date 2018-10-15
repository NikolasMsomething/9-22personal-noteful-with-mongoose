const mongoose = require('mongoose');

const { MONGODB_URI } = require('../config');
const User = require('../models/')
const Folder = require('../models/folder');

const { folders } = require('../db/seed/folders');
const Note = require('../models/note');
const { notes } = require ('../db/seed/notes');



mongoose.connect(MONGODB_URI, { useNewUrlParser:true })
  .then(() => mongoose.connection.db.dropDatabase())
  .then(() => {
    return Promise.all([
      User.insertMany(users),
      Note.insertMany(notes),
      
      Folder.insertMany(folders),
      Folder.createIndexes(),
    ]);
  })
  .then(() => mongoose.disconnect())
  .catch(err => {
    console.error(err);
  });