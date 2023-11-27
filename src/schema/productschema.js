// schema.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  link: {
    type: String, // Assuming links is an array of strings
  },
});

const productModel = mongoose.model('productModel', productSchema);

module.exports = productModel;
