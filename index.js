#!/usr/bin/env nodejs
'use strict';

const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');

const {MONGO_URI, PORT} = require('./src/constants').config;
const {addresses} = require('./src/controllers');

const app = express();

(async () => {
  await mongoose.connect(MONGO_URI , {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    reconnectTries: 5000,
    reconnectInterval: 0,
    socketTimeoutMS: 100000,
    connectTimeoutMS: 100000,
  });

  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  app.get('/addresses/:id', addresses.get);
  app.get('/addresses', addresses.get);

  app.post('/addresses', addresses.create);

  app.put('/addresses/:id', addresses.edit);

  app.delete('/addresses/:id', addresses.remove);

  app.listen(process.env.PORT || PORT, () =>
    console.log(`App listening on port ${PORT}`),
  );
})();

module.exports = app;
