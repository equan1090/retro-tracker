var express = require('express');
const { validationResult } = require('express-validator');
var router = express.Router();
const { loginUser, logoutUser, restoreUser, requireAuth } = require('../auth.js');
const { asyncHandler } = require('./utils.js');
const db = require(`../db/models`);

router.delete('/reviews/:id(\\d+)', restoreUser, requireAuth, asyncHandler(async(req, res, next) => {
    console.log("In the delete statement")
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


module.exports = router;
