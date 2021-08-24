var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');

const db = require('../db/models');
const {
   bcrypt,
   csrfProtection,
    asyncHandler 
  } = require('./utils');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/register', csrfProtection, asyncHandler( async (req, res, next) => {
  const user = await db.User.build();
  res.render('user-register', {
    title: 'Register with RetroGameTracker',
    user,
    csrfToken: req.csrfToken()
  })
}));

router.post('/register', csrfProtection, asyncHandler( async (req, res, next) => {
  const {
    email,
    username,
    password
  } = req.body;

  const user = db.User.build({
    email,
    username,
  })

  //TODO: Need to call validators here and save it to a variable
  //  Please change null to correct value when time comes
  const validationErrors = null;

  if (validationErrors.isEmpty()){
    
    user.password = await bcrypt.hash(password, 10);
    await user.save();
    res.redirect('/');
  
  } else {
  
    const errors = validationErrors.array().map(error => error.msg);
    res.render('user-register', {
      title: 'Register with RetroGameTracker',
      user,
      errors,
      csrfToken: req.csrfToken()
    });
  
  }

}));

module.exports = router;
