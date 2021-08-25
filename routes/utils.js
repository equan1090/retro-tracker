const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });
const bcrypt = require(`bcryptjs`);
const { check } = require('express-validator');
const db = require('../db/models');

const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);

const loginValidators = [
    check('email')
        .exists({ checkFalsy: true })
        .withMessage('Invalid email or password'),

    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Invalid email or password')
]

const userValidators = [
    check('email')
        .exists({ checkFalsy: true })
        .withMessage('Please provide an email')
        .isLength({ max: 50 })
        .withMessage('Email must not exceed 50 chars')
        .isEmail()
        .withMessage('Must be a valid email')
        // this may not work - delete if it doesn't work
        .custom((value) => {
            return db.User.findOne({ where: {
                email: value
            } })
                .then((user) => {
                    if (user) {
                        return Promise.reject('This email already exists')
                    }
                })
        }),
    check('username')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a username')
        .isLength({ max: 25 })
        .withMessage('Username must not exceed 25 chars')
        .custom((value) => {
            return db.User.findOne({ where: {
                username: value
            } })
                .then((user) => {
                    if (user) {
                        return Promise.reject('This username already exists')
                    }
                })
        }),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a password')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, 'g')
        .withMessage('Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character (i.e. "!@#$%^&*")'),
    check('confirmPassword')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a password')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
              throw new Error('Confirm Password does not match Password');
            }
            return true;
          })
]

const reviewValidators = [
    check("title")
        .exists({checkFalsy: true})
        .withMessage("Please provide a title"),
    check("rating")
        .exists({checkFalsy: true})
        .withMessage("Please provide a valid rating"),
    check("content")
        .exists({checkFalsy: true})
        .withMessage(
            `You have come all this way to make a review and haven't written anything? Why not?? Please write a review`
        )
]

module.exports = {
  loginValidators,
  bcrypt,
  csrfProtection,
  asyncHandler,
  userValidators,
  reviewValidators
};
