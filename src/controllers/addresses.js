'use strict';

const {Address} = require('../models');

module.exports.addresses = {
  get: async (req, res) => {
    let pageNumber = parseInt(req.query.pageNumber) || 0;
    let nPerPage = parseInt(req.query.nPerPage) || 50;
    try {
      let addresses = await Address.find(
        {},
        {
          _id: 1,
        },
      )
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
    console.log('BUILD ME PLEASE');
    res.status(500).json({error: 'BUILD ME PLEASE'});
  },
  edit: async (req, res) => {
    console.log('BUILD ME PLEASE');
    res.status(500).json({error: 'BUILD ME PLEASE'});
  },
  remove: async (req, res) => {
    console.log('BUILD ME PLEASE');
    res.status(500).json({error: 'BUILD ME PLEASE'});
  },
};
