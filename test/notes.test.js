const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const app = require('../server');
const { TEST_MONGODB_URI  } = require('../config');
const Note = require('../models/note');
const { notes } = require('../db/seed/notes');

const expect = chai.expect;

chai.use(chaiHttp);

describe('Notes API ', function () {

  before(function () {
    return mongoose.connect(TEST_MONGODB_URI)
      .then(() => mongoose.connection.db.dropDatabase());
  });
    
  beforeEach(function () {
    return Note.insertMany(notes);
  });
    
  afterEach(function () {
    return mongoose.connection.db.dropDatabase();
  });
    
  after(function () {
    return mongoose.disconnect();
  });

  describe('GET to /api/notes should return all notes!', function() {
    it('Should return all notes as an array of objects', function () {
      let notes;
      return chai.request(app).get('/api/notes')
        .then((response) => {
          notes = response.body;
          expect(response).to.have.status(200);
          expect(response.body).to.be.a('array');
          return Note.find();
        }).then(notesFromDb => {
          expect(notes.length).to.eql(notesFromDb.length);
        });
    });
  });

  describe('GET to /api/notes/:id should return a single note!', function () {
    it('GET /api/notes/:id Should return a single note that matches one from the database', function () {
      let note;
      return Note.findOne()
        .then(dbNote => {
          note = dbNote;
          return chai.request(app).get(`/api/notes/${dbNote.id}`);
        }).then(response => {
          expect(response).to.have.status(200);
          expect(response.body).to.be.a('object');
          expect(response.body).to.include.keys(['title', 'content']);
        });
    }); 

    it('GET /api/notes/:badID should return a 404 bad request', function () {
      let id = '1230123123123123213123';
      return chai.request(app).get(`/api/notes/${id}`)
        .then(response => {
          expect(response).to.have.status(404);
        });
    });
  });

  describe('POST /api/notes should sucessfully post an object and have a 201 request', function() {
    it('should post a new object to and report a 201 request', function () {
      const newObject = {
        title: 'poop',
        content: 'zoop'
      };
      return chai.request(app).post('/api/notes').send(newObject)
        .then((response) => {
          newObject.id = response.body.id;
          const id = response.body.id;
          expect(response.body).to.include.keys(['title','content','createdAt','updatedAt']);
          expect(response).to.have.status(200);
          return Note.findById(id);
        }).then(note => {
          console.log(note);
          expect(note.id).to.be.eql(newObject.id);
          expect(note.title).to.be.eql(newObject.title);
          expect(note.content).to.be.eql(newObject.content);
          expect(note).to.be.a('object');
        });
    });
  });

});