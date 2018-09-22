const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const folderSchema = new Schema({
  title: {type: String, required: true}
});

folderSchema.set('timestamps', true);

folderSchema.set('toObject', {
  virtuals: true,     // include built-in virtual `id`
  transform: (doc, ret) => {
    delete ret._id; // delete `_id`
    delete ret.__v;
  }
});

module.exports = mongoose.model('Folder', folderSchema);