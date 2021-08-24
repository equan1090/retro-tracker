var express = require('express');
var router = express.Router();
let {restoreUser} = require('../auth');

/* GET home page. */
router.get('/', restoreUser, function(req, res, next) {
  res.render('index', {
    title: "a/A Express Skeleton Home",
  })
});

module.exports = router;
