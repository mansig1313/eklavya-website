const mongoose = require('mongoose');

const ResourceSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  fileName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  filePath: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Resource', ResourceSchema);