const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  title: String,
  description: String,
}, { collection: 'category' }); // Set the collection name explicitly

const category = mongoose.model('category', categorySchema);

module.exports = category;
