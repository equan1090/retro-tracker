var express = require('express');
const { validationResult } = require('express-validator');
var router = express.Router();
const { loginUser, logoutUser, restoreUser, requireAuth } = require('../auth.js');
const { asyncHandler } = require('./utils.js');

router.delete('/api/reviews/:id(\\d+)', restoreUser, requireAuth, asyncHandler(async(req, res, next) => {

}))





module.exports = router;
