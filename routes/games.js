var express = require('express');
var router = express.Router();
const { asyncHandler } = require('./utils.js');
const db = require('../db/models');

//Gets all games in the games table
router.get('/', asyncHandler(async(req, res, next) => {
    const allGames = await db.Game.findAll();

    res.render('all-games', {allGames});
}));

// //Gets a specific game based on id
router.get('/:id(\\d+)', asyncHandler(async(req, res, next) => {
    const specificGame = await db.Game.findByPk(req.params.id);
    if(specificGame) {
        res.render('specific-game', {specificGame});
    }else{
        next(new Error("Game not found"));
        // res.send("404 error: Game not found")
    }
}));

//TODO
//Showing all reviews for a specific game
router.get('/:id(\\d+)/reviews', asyncHandler(async (req, res, next) => {
    const reviews = await db.Review.findAll({
        where: {
            gameId: req.params.id
        },
        include: [
            db.Game,
            db.User
        ]
    })
    console.log(reviews);
}));

//Create a review for a specific game
router.post("/:id(\\d+)/review")

//Gets a new form to create a review
router.get('/:id(\\d+)/reviews/new')

module.exports = router;
