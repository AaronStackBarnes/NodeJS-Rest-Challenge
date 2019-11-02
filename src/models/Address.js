'use strict';

const mongoose = require('mongoose');

var MatchSchema = new mongoose.Schema({
  updatedAt: {type: Date, default: Date.now},
});

MatchSchema.methods.respondToMessages = function(tinderAuthToken) {};

module.exports.Match = mongoose.model('Match', MatchSchema);
