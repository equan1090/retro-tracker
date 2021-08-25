var express = require('express');
const { validationResult } = require('express-validator');
var router = express.Router();
const { loginUser, logoutUser, restoreUser, requireAuth } = require('../auth.js')

const db = require('../db/models');
const {
  bcrypt,
  csrfProtection,
  asyncHandler,
  userValidators
  } = require('./utils');

/* GET users listing. */
router.get('/:id(\\d+)', restoreUser, requireAuth, asyncHandler( async(req, res, next) =>  {
  const userId = req.params.id;
  const specifiedUser = await db.User.findByPk(userId);

  const collections = await db.Collection.findAll({
    where: { userId },
    include: db.Game
    });

  if (userId == req.session.auth.userId) {
    if (specifiedUser) {
      console.log(specifiedUser);
      res.render('users-page', {
        userProfilePage: true,
        specifiedUser,
        collections
      });
    } else {
      console.log(`No user with id ${userId} exists`);
    }
  } else {
    res.render('users-page', {
      userProfilePage: false,
      specifiedUser
    });
  }
}));

router.get('/login', csrfProtection, asyncHandler(async(req, res, next) => {
  // const user = await db.User.;
  res.render('login', {
    title: 'Log in to RetroGameTracker',
    csrfToken: req.csrfToken(),
  })
}))

router.post('/login', csrfProtection, asyncHandler(async(req, res, next) => {
  const {
    email,
    password
  } = req.body;

  const validationErrors = validationResult(req);
  const errors = [];

  if(validationErrors.isEmpty()) {
    const user = await db.User.findOne({
      where: { email },
    })

    if(user !== null) {
      const compare = await bcrypt.compare(password, user.hashedPassword)
      if(compare) {
        loginUser(req, res, user);
        res.redirect(`/users/${user.id}`);
      }
    }
    errors.push("Log in failed")
    res.send('Failure')

  } else{
    errors = validationErrors.array().map(error => error.msg);
    res.render('login', {
      title: 'Log in to RetroGameTracker',
      user,
      errors,
      csrfToken: req.csrfToken()
    });
  }
}))

router.get('/logout', (req, res, next) => {
  logoutUser(req, res);
  res.redirect('/');
});


router.get('/register',  csrfProtection, asyncHandler( async (req, res, next) => {
  const user = await db.User.build();
  res.render('user-register', {
    title: 'Register with RetroGameTracker',
    user,
    csrfToken: req.csrfToken()
  })
}));

router.post('/register', csrfProtection, userValidators, asyncHandler( async (req, res, next) => {
  const {
    email,
    username,
    password,
  } = req.body;

  const user = db.User.build({
    email,
    username,
  })


  const validationErrors = validationResult(req);
  console.log(validationErrors)
  if (validationErrors.isEmpty()){

    user.hashedPassword = await bcrypt.hash(password, 10);
    await user.save();

    const collections = ['Wishlist', 'Playing', 'Played' ]

    for (let i=0; i < collections.length; i++) {
      await db.Collection.create({
      name: collections[i],
      userId: user.id
    });
    }


    loginUser(req, res, user);
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
