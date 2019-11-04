const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');

const {Address} = require('../src/models');

const testAddress = {
  street: 'test street',
  zip: '123-456',
  country: 'USA',
  state: 'NY',
  city: 'NYC',
};

let address;

// Configure chai
chai.use(chaiHttp);
chai.should();
describe('Addresss', () => {
  describe('GET /', () => {
    beforeEach(done => {
      address = new Address(testAddress);
      caAddress = new Address({...testAddress, state: 'CA'});
      indiaAddress = new Address({...testAddress, state: 'UP', country: 'IND'});
      Promise.all([address.save(), caAddress.save(), indiaAddress.save()]).then(
        () => done(),
      );
    });

    afterEach(done => {
      Address.collection.drop().then(() => done());
    });

    // Test to get all addresses record
    it('should get all addresses record', done => {
      chai
        .request(app)
        .get('/addresses')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.addresses.should.exist;
          res.body.addresses.should.have.lengthOf(3);
          done();
        });
    });

    // Test to get all addresses records from a country
    it('should get all addresses record', done => {
      chai
        .request(app)
        .get('/addresses?country=USA')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.addresses.should.exist;
          res.body.addresses.should.have.lengthOf(2);
          done();
        });
    });

    // Test to get all addresses records from a state
    it('should get all addresses record', done => {
      chai
        .request(app)
        .get('/addresses?state=UP')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.addresses.should.exist;
          res.body.addresses.should.have.lengthOf(1);
          done();
        });
    });

    // Test to get single address record
    it('should get a single address record', done => {
      chai
        .request(app)
        .get(`/addresses/${address._id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });

    // Test to not get a single address record
    it('should NOT get a single address record with a bad ID', done => {
      chai
        .request(app)
        .get(`/addresses/12345`)
        .end((err, res) => {
          res.should.have.status(500);
          done();
        });
    });

    // Test to create a record
    it('should create an address and respond with an id', done => {
      chai
        .request(app)
        .post('/addresses')
        .send(testAddress)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.id.should.exist;
          res.body.id.should.be.a('string');
          done();
        });
    });

    // Test to fail creating a bad address miss matched state and country
    it('should fail to create an address due to bad geo data', done => {
      chai
        .request(app)
        .post('/addresses')
        .send({...testAddress, country: 'IND'})
        .end((err, res) => {
          res.should.have.status(500);
          res.body.should.be.a('object');
          res.body.error.should.exist;
          res.body.error.should.be.a('string');
          res.body.error.should.equal('No Matching state found');
          done();
        });
    });

    // Test to fail creating a record missing info
    it('should fail to create an address due to missing info', done => {
      chai
        .request(app)
        .post('/addresses')
        .send({})
        .end((err, res) => {
          res.should.have.status(500);
          res.body.should.be.a('object');
          res.body.error.should.exist;
          done();
        });
    });

    // Test to update a record
    it('should update address record with good geo data', done => {
      chai
        .request(app)
        .put(`/addresses/${address._id}`)
        .send({state: 'CA'})
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

    // Test to fail updating a record do to bad state / country match
    it('should not update address record with bad geo data', done => {
      chai
        .request(app)
        .put(`/addresses/${address._id}`)
        .send({state: 'CAAAAAA'})
        .end((err, res) => {
          res.should.have.status(500);
          res.body.should.be.a('object');
          res.body.error.should.exist;
          res.body.error.should.be.a('string');
          res.body.error.should.equal('No Matching state found');
          done();
        });
    });

    // Test to remove a record
    it('should remove  a single address record', done => {
      chai
        .request(app)
        .delete(`/addresses/${address._id}`)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
});
