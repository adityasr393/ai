const mongoose = require('mongoose');

const h4Schema = new mongoose.Schema({
  title: String,
  description: String,
}, { collection: 'sub-category' }); // Set the collection name explicitly

const H4Model = mongoose.model('H4Model', h4Schema);

module.exports = H4Model;
