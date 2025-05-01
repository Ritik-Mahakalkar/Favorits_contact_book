const mongoose = require('mongoose');

// Define contact schema
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  is_favorite: {
    type: Boolean,
    default: false,
  },
});

// Create and export the contact model
const Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact;
