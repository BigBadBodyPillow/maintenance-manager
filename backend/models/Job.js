const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  description: String,
  location: String,
  priority: String,
  status: { type: String, default: 'submitted' },
  // dateSubmitted: { type: Date, default: Date.now },
  archived: { type: Boolean, default: false },
});

module.exports = mongoose.model('Job', jobSchema);
