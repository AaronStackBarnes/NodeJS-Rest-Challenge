'use strict';

const {Address} = require('../models');

module.exports.addresses = {
  get: async (req, res) => {
    let pageNumber = parseInt(req.query.pageNumber) || 0;
    let nPerPage = parseInt(req.query.nPerPage) || 50;
    let query = {};

    if (req.query.state) {
      query.state = req.query.state;
    }

    if (req.query.country) {
      query.country = req.query.country;
    }

    try {
      let addresses = await Address.find(query)
        .sort({updatedAt: -1})
        .skip(pageNumber > 0 ? (pageNumber - 1) * nPerPage : 0)
        .limit(nPerPage)
        .exec();

      res.status(200).json({addresses: addresses});
    } catch (error) {
      res.status(500).json({error: error});
    }
  },
  create: async (req, res) => {
    try {
      let address = new Address({
        street: req.body.street,
        zip: req.body.zip,
        country: req.body.country,
        state: req.body.state,
        city: req.body.city,
      });

      await address.save();
      res.status(200).json({id: address._id});
    } catch (error) {
      res.status(500).json({error: error});
    }
  },
  edit: async (req, res) => {
    try {
      await Address.findOneAndUpdate({id: req.params.id}, req.body).exec();
    } catch (error) {
      res.status(500).json({error: error});
    }
  },
  remove: async (req, res) => {
    try {
      await Address.findOne({id: req.params.id})
        .remove()
        .exec();
    } catch (error) {
      res.status(500).json({error: error});
    }
  },
};
