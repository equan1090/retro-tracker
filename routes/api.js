var express = require('express');
const { validationResult } = require('express-validator');
var router = express.Router();
const { loginUser, logoutUser, requireAuth } = require('../auth.js');
const { asyncHandler } = require('./utils.js');
const db = require(`../db/models`);



router.delete('/reviews/:id(\\d+)', requireAuth, asyncHandler(async(req, res, next) => {

    const review = await db.Review.findByPk(req.params.id);
    const sessionUserId = req.session.auth.userId;

    if (review && (sessionUserId === review.userId)) {
        await review.destroy();
        res.json({'Message': 'The review has been deleted'});
    } else if (!review) {
        next(new Error('Review not found'));
    } else if (sessionUserId !== review.userId) {
        next(new Error('You are not authorized to delete that. You are not that user.'));
    }
}));


/*
    This router post handler serves as a way to add a specific game to one's own specific collection
    if they are a registered user.
*/
router.post('/collections/:id(\\d+)', asyncHandler(async(req, res, next) => {

    const {gameId} = req.body;

    const newGameCollectionConnection = await db.GameCollectionConnection.create(
        {
            collectionId: req.params.id,
            gameId
        }
    );
    res.json(newGameCollectionConnection);
}));


/*
    This router delete handler serves as a way to remove a specific game from one's own specific collection if they are a registered user.
*/
router.delete('/collections/:id(\\d+)/games', asyncHandler(async (req, res, next) => {

    const { gameId } = req.body;

    const collection = await db.GameCollectionConnection.findOne({
        where: { collectionId:req.params.id, gameId }
    });
    
    await collection.destroy();
    res.json({"Message": "Game deleted!"});
}));


module.exports = router;
