var mongoose = require('mongoose'),
    debug    = require('debug')('app:models');

var defaultTagSchema = new mongoose.Schema({
  tag_name: String,
  created: { type: Date, default: Date.now }
});

var DefaultTag = mongoose.model('defaultTag', defaultTagSchema);

module.exports = DefaultTag;
