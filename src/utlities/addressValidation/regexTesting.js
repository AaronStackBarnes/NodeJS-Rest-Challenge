module.exports.regexTesting = address => {
  let errors = [];

  //TODO: add testing for other inputs
  //NOTE: I know nothing about state and country codes... This regex is certainly not sufficient.
  //NOTE: I will hopefully remember to note this else where maybe in the readme but this set up assumes that whatever is consuming this API is sending just country codes not full names etc. For example if its a user input field there is a google API helping with auto complete.
  let validCode = /^[a-zA-Z]+$/;

  if (!validCode.test(address.state)) {
    address.errors.push({code: 123, message: 'invalid state'});
  }

  if (!validCode.test(address.country)) {
    address.errors.push({code: 124, message: 'invalid country'});
  }

  return errors;
};
