const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Creating new noteSchema
const noteSchema = new Schema({
  title: {type: String, require: true},
  content: String
});

// Add `createdAt` and `updatedAt` fields
noteSchema.set('timestamps', true);

module.exports = mongoose.model('Note', noteSchema);