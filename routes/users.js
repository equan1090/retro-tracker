var express = require('express');
const { validationResult } = require('express-validator');
var router = express.Router();


const db = require('../db/models');
const {
  bcrypt,
  csrfProtection,
  asyncHandler,
  userValidators
  } = require('./utils');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/register',  /*csrfProtection, */asyncHandler( async (req, res, next) => {
  const user = await db.User.build();
  res.render('user-register', {
    title: 'Register with RetroGameTracker',
    user,
    // csrfToken: req.csrfToken()
  })
}));

router.post('/register', /*csrfProtection, */userValidators, asyncHandler( async (req, res, next) => {
  const {
    email,
    username,
    password,
  } = req.body;

  const user = db.User.build({
    email,
    username,
  })

  //TODO: Need to call validators here and save it to a variable
  //  Please change null to correct value when time comes
  const validationErrors = validationResult(req);
  console.log(validationErrors)
  if (validationErrors.isEmpty()){

    user.hashedPassword = await bcrypt.hash(password, 10);
    await user.save();
    res.redirect('/');

  } else {

    const errors = validationErrors.array().map(error => error.msg);
    res.render('user-register', {
      title: 'Register with RetroGameTracker',
      user,
      errors,
      // csrfToken: req.csrfToken()
    });
  }
}));

module.exports = router;
