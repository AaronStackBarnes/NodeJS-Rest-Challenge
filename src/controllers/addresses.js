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

    if (req.params.id) {
      // this feels like it can be improved maybe this should be two seprate controllers but
      // I want to make sure if we have an ID none of the other params matter.
      query = {
        _id: req.params.id,
      };
    }

    try {
      let addresses = await Address.find(query)
        .sort({updatedAt: -1})
        .skip(pageNumber > 0 ? (pageNumber - 1) * nPerPage : 0)
        .limit(nPerPage)
        .exec();

      if (!addresses) {
        return res.sendStatus(404);
      }

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
      let address = await Address.findOne({_id: req.params.id}).exec();
      if (!address) {
        return res.sendStatus(404);
      }

      if (req.body.street) {
        address.street = req.body.street;
      }
      if (req.body.zip) {
        address.zip = req.body.zip;
      }
      if (req.body.country) {
        address.country = req.body.country;
      }
      if (req.body.state) {
        address.state = req.body.state;
      }
      if (req.body.city) {
        address.city = req.body.city;
      }

      await address.save();

      res.sendStatus(200);
    } catch (error) {
      res.status(500).json({error: error});
    }
  },
  remove: async (req, res) => {
    try {
      await Address.findOne({_id: req.params.id})
        .remove()
        .exec();

      res.sendStatus(200);
    } catch (error) {
      res.status(500).json({error: error});
    }
  },
};
