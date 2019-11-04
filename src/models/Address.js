'use strict';

const mongoose = require('mongoose');

const {addressValidation} = require('../utlities');

var AddressSchema = new mongoose.Schema({
  street: {type: String, required: true},
  zip: {type: String, required: true},
  country: {type: String, required: true},
  state: {type: String, required: true},
  city: {type: String, required: true},
  updatedAt: {type: Date, default: Date.now},
});
AddressSchema.pre('save', async function() {
  return new Promise(async (resolve, reject) => {
    //NOTE: I dont like this pattern it feels very WET if the server every grew in complexity I would look at a possible refactor here.

    let regexErrors = addressValidation.regexTesting(this);
    if (regexErrors.length) {
      return reject(regexErrors);
    }

    try {
      await addressValidation.matchStateToCountry(this.country, this.state);
      return resolve();
    } catch (e) {
      return reject(e);
    }
  });
});

module.exports.Address = mongoose.model('Address', AddressSchema);
