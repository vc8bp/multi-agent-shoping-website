const mongoose = require('mongoose');

const agentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    require: true
  },
  number: {
    type: String,
    require: true,
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

});

module.exports = mongoose.model('Agent', agentSchema);
