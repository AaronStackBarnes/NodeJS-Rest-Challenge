const {sendRequest} = require('../helpers/');

module.exports.matchStateToCountry = (country, state) => {
  const options = {
    hostname: 'www.groupkt.com',
    path: `/state/get/${country}/${state}`,
    method: 'GET',
  };

  return new Promise(async (resolve, reject) => {
    try {
      // A bit of logic here:
      // 1. hit the api
      let result = await sendRequest(options);
      // 2. double check we have the needed keys and info in the json response
      // Is this overkill?
      if (
        !result.RestResponse ||
        !result.RestResponse.messages ||
        !result.RestResponse.messages.length
      ) {
        return reject('API error: response poorly formatted');
      }

      let message = result.RestResponse.messages[0];
      // 3. this api seems to not use codes so read the response message for either...
      if (message.includes('State found matching')) {
        // a fit in which case we resolve because the state does match the country
        return resolve();
      } else {
        // or we reject because the state does not match
        return reject('No Matching state found');
      }
    } catch (e) {
      reject(`API Error: ${e}`);
    }
  });
};
