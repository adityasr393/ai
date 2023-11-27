// schema/h2Schema.js

const mongoose = require('mongoose');

const h2Schema = new mongoose.Schema({
  title: String,
  description: String,
});

const h2Model = mongoose.model('h2Model', h2Schema);

module.exports = h2Model;
