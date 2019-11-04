const mongoose = require('mongoose');
const {MONGO_URI} = require('../src/constants');

mongoose.connect('mongodb://localhost/paperspaceTests', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection
  .once('open', () => console.log('Connected!'))
  .on('error', error => {
    console.warn('Error : ', error);
  });
beforeEach(done => {
  mongoose.connection.collections.addresses.drop(() => {
    done();
  });
});
