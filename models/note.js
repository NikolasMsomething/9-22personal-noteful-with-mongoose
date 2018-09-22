const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Creating new noteSchema
const noteSchema = new Schema({
  title: {type: String, require: true},
  content: String,
  folderId: {type: mongoose.Schema.Types.ObjectId, ref: 'Folder'}
});

// Add `createdAt` and `updatedAt` fields
noteSchema.set('timestamps', true);



noteSchema.set('toObject', {
  virtuals: true,     // include built-in virtual `id`
  transform: (doc, ret) => {
    delete ret._id; // delete `_id`
    delete ret.__v;
  }
});

//export the schema Note which mongoose translate to 'notes'

module.exports = mongoose.model('Note', noteSchema);