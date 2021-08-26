var express = require('express');
const { validationResult } = require('express-validator');
var router = express.Router();
const { loginUser, logoutUser, restoreUser, requireAuth } = require('../auth.js');
const { asyncHandler } = require('./utils.js');
const db = require(`../db/models`);

//Get a review with the given id
router.get('/:id', asyncHandler( async (req, res, next) => {
    const review = await db.Review.findByPk(req.params.id);
    if (review) {
        res.render('specific-review', {
            review
            //TODO: Add a var if the user is the owner of the review
            //  to reveal the edit button
        })
    } else {
        next(new Error('Review not found'));
    }
}));

//Edit a review with a given id
router.post('/:id');

//present a form that will edit a review
//TODO: Checks to make sure that the user that owns the
//  review is the only one who can edit.
router.get('/:id/edit')

module.exports = router;
