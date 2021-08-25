var express = require('express');
var router = express.Router();
const { asyncHandler, csrfProtection } = require('./utils.js');
const db = require('../db/models');
const {restoreUser, requireAuth} = require('../auth.js')

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
    const specificGame = await db.Game.findByPk(req.params.id ,{
        include: [
            {
                model: db.Review,
                include: db.User
            }

        ]
    })
     console.log(specificGame);
    if(specificGame){
        res.render('specific-game-reviews', {specificGame})
        //res.json({specificGame})
    } else{
        next(new Error('Games has no reviews'))
    }
}));


//Gets a new form to create a review
router.get('/:id(\\d+)/reviews/new',
    csrfProtection,
    restoreUser,
    requireAuth,
    asyncHandler(async(req, res ,next) => {
        res.render('review-form')
    })
)

//Create a review for a specific game
router.post("/:id(\\d+)/review", asyncHandler(async(req, res ,next) => {

}));

module.exports = router;
