'use strict';

const Store = require('electron-store');

class DataStore extends Store {
  constructor (settings) {
    super(settings);
    this.notes = this.get('notes') || [];
  };

  // Following methods returns 'this' => allow method chaining

  saveNotes () {
    this.set('notes', this.notes);
    return this;
  };

  getNotes () {
    this.notes = this.get('notes') || [];
    return this;
  };

  addNote (note) {
    this.notes = [ ...this.notes, note ];
    return this.saveNotes();
  };

  deleteNote (note) {
    this.notes = this.notes.filter(item => item !== note);
    return this.saveNotes();
  };

  clear() {
    this.notes = [];
    return this.saveNotes();
  };

};

module.exports = DataStore;
