var express = require('express');
var router = express.Router();
const { asyncHandler } = require('../auth.js')
const db = require('../db/models')

//Gets all games in the games table
router.get('/', asyncHandler(async(req, res, next) => {
    const allGames = await db.Games.findAll();
    res.render('all-games', {allGames})
}))

//Gets a specific game based on id
router.get('/:id(\\d+)', asyncHandler(async(req, res, next) => {
    const specificGame = await db.Games.findByPk(req.params.id)
    if(specificGame) {
        res.render('specific-game', {specificGame})
    }
}))

//TODO
//Showing all reviews for a specific game
router.get('/:id(\\d+)/review')

//Create a review for a specific game
router.post("/:id(\\d+)/review")

//Gets a new form to create a review
router.get('/:id(\\d+)/reviews/new')
