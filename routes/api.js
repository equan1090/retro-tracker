var express = require('express');
const { validationResult } = require('express-validator');
var router = express.Router();
const { loginUser, logoutUser, requireAuth } = require('../auth.js');
const { asyncHandler } = require('./utils.js');
const db = require(`../db/models`);

router.delete('/reviews/:id(\\d+)', requireAuth, asyncHandler(async(req, res, next) => {
    const review = await db.Review.findByPk(req.params.id);
    const sessionUserId = req.session.auth.userId;
    if (review){
        if (sessionUserId === review.userId){
            await review.destroy();
            res.json({'Message': 'The review has been deleted'})
        }else{
            next(new Error('You are not authorized to delete that. You are not that user.'));
        }
    }else{
        next(new Error('Review not found'));
    }
}))

router.post('/collections/:id(\\d+)', asyncHandler(async(req, res, next) => {
    const {gameId} = req.body;
    const newGameCollectionConnection = await db.GameCollectionConnection.create(
        {
            collectionId: req.params.id,
            gameId
        }
    );
    res.json(newGameCollectionConnection);
}))

module.exports = router;
