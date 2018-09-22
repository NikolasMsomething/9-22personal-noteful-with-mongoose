const mongoose = require('mongoose');
const { MONGODB_URI } = require('../config');

const Note = require('../models/note');

mongoose.connect(MONGODB_URI, { useNewUrlParser:true })
  .then(() => {
    const searchTerm = 'lady gaga';
    let filter = {};
    const re = new RegExp(searchTerm, 'gi');
    console.log(re);

    

    console.log(filter);

    return Note.find({$or: [{title: re}, {content: re}]}).sort({update: 'desc'});
  }).then(results => {
    console.log(results);
  }).then(() => {
    return mongoose.disconnect();
  }).catch(err => {
    console.error(`ERROR: ${err.message}`);
    console.error(err);
  });

mongoose.connect(MONGODB_URI, {useNewUrlParser: true})
  .then(() => {
    const id = '000000000000000000000007';

    return Note.findById({_id: id}, {title: 1})
      .then(response => {
        console.log(response);
      }).then(() => {
        return mongoose.disconnect();
      }).catch(err => {
        console.error(err);
      });
  });

mongoose.connect(MONGODB_URI, {useNewUrlParser: true})
  .then(() => {
    const newObj = {
      title: 'Title1',
      content: 'zooza'
    };

    return Note.create(newObj)
      .then(response => {
        console.log(response);
      }).then(() => {
        return mongoose.disconnect();
      }).catch(err => {
        console.error(err);
      });
  });

mongoose.connect(MONGODB_URI, {useNewUrlParser: true})
  .then(() => {
 
    const id = '000000000000000000000003';

    const updateProperties = {
      title: 'UpdatedTitle',
      content: 'UpdatedZooza'
    };

    return Note.findByIdAndUpdate({_id: id}, updateProperties, {new: true})
      .then(res => {
        console.log(res);
      }).catch(err => {
        console.error(err);
      });
  });

mongoose.connect(MONGODB_URI, {useNewUrlParser: true})
  .then(() => {
    const id = '000000000000000000000003';

    console.log(Note);

    return Note.findByIdAndDelete({_id: id})
      .then(res => {
        console.log(res);
      }).catch(err => {
        console.error(err);
      });
  });


  //Bunch of mongoose queries boys
