'use strict';

const http = require('http');
/*
const options = {
  hostname: "flaviocopes.com",
  path: "/todos",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Content-Length": data.length
  }
};
*/
module.exports.sendRequest = (options, data) => {
  return new Promise(function(resolve, reject) {
    const req = http.request(options, resp => {
      let result = '';

      // A chunk of data has been recieved.
      resp.on('data', chunk => {
        result += chunk;
      });

      // The whole response has been received. Print out the result.
      resp.on('end', () => {
        resolve(JSON.parse(result));
      });
    });

    req.on('error', err => {
      console.log(err.message);
      reject('Error: ' + err.message);
    });

    if (data) {
      req.write(JSON.stringify(data));
    }

    req.end();
  });
};
