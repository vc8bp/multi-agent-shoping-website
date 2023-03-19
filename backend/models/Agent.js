const mongoose = require('mongoose');

const agentSchema = new mongoose.Schema({
  logo: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  number: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  isSeller: {
    type: Boolean,
    default: true
  },
  isVerified: {
    type: Boolean,
    default: false
  }

});

module.exports = mongoose.model('Agent', agentSchema);
