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

AddressSchema.methods.isValid = async function() {
  return new Promise(async (resolve, reject) => {
    //NOTE: I dont like this pattern it feels very WET if the  server every grew in complexity I would look at a possible refactor here.

    let regexErrors = addressValidation.regexTesting(this);
    if (regexErrors.length) {
      return reject(regexErrors);
    }

    // let stateToCountryError = await addressValidation.matchStateToCountry(this.country, this.state)
    //  if (stateToCountryError) {
    //  return reject(stateToCountryError);
    //  }
    resolve();
  });
};

module.exports.Address = mongoose.model('Address', AddressSchema);
