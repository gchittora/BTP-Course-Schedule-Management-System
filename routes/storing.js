const mongoose = require('mongoose');

const StoringSchema = new mongoose.Schema({
  deadlinedate: {
    type: Date,
    required: true
  },
  hodcseflag: {
    type: Boolean,
    default: false
  },
  hodeceflag: {
    type: Boolean,
    default: false
  },
  hodmmeflag: {
    type: Boolean,
    default: false
  },
  hodhssflag: {
    type: Boolean,
    default: false
  },
  hodmthflag: {
    type: Boolean,
    default: false
  },
  hodphyflag: {
    type: Boolean,
    default: false
  }
});

const Storing = mongoose.model('Storing', StoringSchema);

module.exports = Storing;