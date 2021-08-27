var express = require('express');
const { validationResult } = require('express-validator');
const { ResultWithContext } = require('express-validator/src/chain');
var router = express.Router();
const { loginUser, logoutUser, requireAuth } = require('../auth.js')

const db = require('../db/models');
const {
  bcrypt,
  csrfProtection,
  asyncHandler,
  userValidators
  } = require('./utils');

/* GET users listing. */
router.get('/:id(\\d+)', asyncHandler( async(req, res, next) =>  {
  const userId = req.params.id;
  const specifiedUser = await db.User.findByPk(userId);

  const collections = await db.Collection.findAll({
    where: { userId },
    include: db.Game
    });

    // Checks if you are in your own profile page
    if (req.session.auth && userId == req.session.auth.userId && specifiedUser) {
      res.render('users-page', {
        userProfilePage: true,
        specifiedUser,
        collections,
      })
    } else if ((!req.session.auth && specifiedUser) || (req.session.auth && userId != req.session.auth.userId && specifiedUser)) {
      res.render('users-page', {
        userProfilePage: false,
        specifiedUser,
        collections,
      })
    } else {
      next(new Error('This user does not exist'))
    }
}));

router.get('/login', csrfProtection, asyncHandler(async(req, res, next) => {
  // const user = await db.User.;
  res.render('login', {
    title: 'Log in to RetroGameTracker',
    csrfToken: req.csrfToken(),
    demoUser: false
  })
}))

router.get('/login/demo', csrfProtection, asyncHandler(async (req, res, next) => {
  const demoUser = await db.User.findOne({
    where: {username:"demo"},
  })

  const demoUserPassword = 'Abc123!@-';
  res.render('login', {
    title: 'Log in to RetroGameTracker',
    csrfToken: req.csrfToken(),
    demoUser,
    demoUserPassword
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
        return req.session.save(error => {
          if(error) {
            next(error)
          }else {
            return res.redirect(`/users/${user.id}`);
          }
        })
      }
    }
    errors.push("Log in failed")
    res.render('login', {
      errors,
      title: "Log in to RetroGameTracker"
    })

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
  return req.session.save(error => {
    if(error) {
      next(error)
    }else {
      return res.redirect('/');
    }
  })
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
  if (validationErrors.isEmpty()){

    user.hashedPassword = await bcrypt.hash(password, 10);
    await user.save();

    const collections = ['Wishlist', 'Playing', 'Completed' ]

    for (let i=0; i < collections.length; i++) {
      await db.Collection.create({
      name: collections[i],
      userId: user.id
    });
    }


    loginUser(req, res, user);
    return req.session.save(error => {
      if(error) {
        next(error)
      }else {
        return res.redirect('/');
      }
    })

  } else {

    const errors = validationErrors.array().map(error => error.msg);
    console.log(errors)
    res.render('user-register', {
      title: 'Register with RetroGameTracker',
      user,
      errors,
      csrfToken: req.csrfToken()
    });
  }
}));

module.exports = router;
