const Router = require('express')
const reviewController = require('../controllers/reviewController') 

const router = Router();

router.route('/').post(reviewController.postReview)
 router.route('/').get(reviewController.getMyReviews) 

module.exports = router