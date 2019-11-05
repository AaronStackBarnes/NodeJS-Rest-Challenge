const mongoose = require('mongoose');
const {TEST_MONGO_URI} = require('../src/constants').config;

mongoose.connect(TEST_MONGO_URI, {
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
