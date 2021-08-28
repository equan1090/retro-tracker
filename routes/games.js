var express = require('express');
var router = express.Router();
const { validationResult } = require('express-validator');
const { asyncHandler, csrfProtection, reviewValidators } = require('./utils.js');
const db = require('../db/models');
const {requireAuth} = require('../auth.js');

// Gets all games in the games table
router.get('/', asyncHandler(async(req, res, next) => {

    const allGames = await db.Game.findAll({
        order: [['name']]
    });

    if (req.session.auth) {
        const allCollections = await db.Collection.findAll({
            where: {userId: req.session.auth.userId}
        });
        res.render('all-games', {allCollections, allGames});
    } else {
        res.render('all-games', {allGames});
    };
}));

// Gets a specific game based on id
router.get('/:id(\\d+)', asyncHandler(async(req, res, next) => {

    const specificGame = await db.Game.findByPk(req.params.id);
    if(specificGame) {
        res.render('specific-game', {specificGame});
    }else{
        next(new Error("Game not found"));
    };
}));

//Showing all reviews for a specific game
router.get('/:id(\\d+)/reviews', asyncHandler(async (req, res, next) => {

    const specificGame = await db.Game.findByPk(req.params.id ,{
        // Here we get the specific game's review and the user who wrote it
        include: [
            {
                model: db.Review,
                include: db.User
            }
        ]
    });

    if(specificGame){
        res.render('specific-game-reviews', {specificGame});
    } else{
        next(new Error('Games has no reviews'));
    }
}));


//Gets a new form to create a review
router.get('/:id(\\d+)/reviews/new', csrfProtection, requireAuth, asyncHandler(async(req, res ,next) => {

        res.render('review-form', {
            gameId: req.params.id,
            csrfToken: req.csrfToken()
        });
    })
);

//Create a review for a specific game
router.post("/:id(\\d+)/reviews", csrfProtection, requireAuth, asyncHandler(async(req, res ,next) => {

    const {title, rating, content} = req.body;
    const reviewErrors = validationResult(req);

    if (reviewErrors.isEmpty()){
        const createReview = await db.Review.create({
            title,
            rating,
            content,
            gameId: req.params.id,
            userId: req.session.auth.userId
        });
        res.redirect(`/games/${req.params.id}/reviews`)
    }else{
        const errors = validationErrors.array().map(error => error.msg);
        res.render('review-form',
            {
                gameId: req.params.id,
                csrfToken: req.csrfToken(),
                errors
            }
        )
    }
}));


module.exports = router;
