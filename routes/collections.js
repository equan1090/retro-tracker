var express = require('express');
var router = express.Router();
const { asyncHandler } = require('./utils.js');
const db = require('../db/models');

/*
  This router get handler serves as a way to grab all of the collections in the database.
*/
router.get('/', asyncHandler(async(req, res, next) => {

  const allCollections = await db.Collection.findAll({
    include: db.User
  });

  res.render('all-collections', {allCollections});
}));

/*
  This router get handler serves as a way to grab all of the specific collection's information.
*/
router.get('/:id(\\d+)', asyncHandler(async(req, res, next) => {

  const specificCollection = await db.Collection.findByPk(req.params.id, {
    include: [db.User, db.Game]
  });

  if(specificCollection) {
    res.render('specific-collection', {specificCollection});
  } else {
    next(new Error("Collection not found"));
  }
}));


module.exports = router;
