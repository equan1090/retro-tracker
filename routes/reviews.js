var express = require('express');
const { validationResult } = require('express-validator');
var router = express.Router();
const { loginUser, logoutUser, requireAuth } = require('../auth.js');
const { asyncHandler, csrfProtection } = require('./utils.js');
const db = require(`../db/models`);

//present a form that will edit a review
router.get('/:id/edit', csrfProtection, requireAuth, asyncHandler( async (req, res, next) => {

    const review = await db.Review.findByPk(req.params.id);

    if (review && (req.session.auth.userId === review.userId)) {
        res.render('edit-review', {
            csrfToken: req.csrfToken(),
            reviewId: req.params.id,
            review
        });
    } else if (req.session.auth.userId !== review.userId) {
        next(new Error("You are not authorized to edit that"));
    } else {
        next(new Error("Review not found"));
    }
}));

//Get a review with the given id
router.get('/:id', asyncHandler( async (req, res, next) => {

    const review = await db.Review.findByPk(req.params.id);

    if (review) {
        res.render('specific-review', {
            review
        });
    } else {
        next(new Error('Review not found'));
    }
}));

//Edit a review with a given id
router.post('/:id', csrfProtection, requireAuth, asyncHandler( async (req, res, next) => {

    const review = await db.Review.findByPk(req.params.id);
    const {title, rating, content} = req.body;

    if (review && (req.session.auth.userId === review.userId)) {
        review.update({
            title,
            rating,
            content
        });
        res.redirect(`/games/${review.gameId}/reviews`);
    } else if (req.session.auth.userId !== review.userId) {
        next(new Error("You are not authorized to delete that"));
    } else {
        next(new Error("Review not found"));
    }
}));


module.exports = router;
