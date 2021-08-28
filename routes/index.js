var express = require('express');
var router = express.Router();
const db = require('../db/models')

/* GET home page. */
router.get('/', async(req, res, next) => {

  const games = await db.Game.findAll({
    limit: 8
  });

  res.render('index', {
    title: "Retro Game Tracker",
    games
  });
});


module.exports = router;
