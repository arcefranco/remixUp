const Router = require('express')
const reviewController = require('../controllers/reviewController') 

const router = Router();

router.route('/').post(reviewController.postReview)
/* router.route('/').get(reviewController.getReviews) */

module.exports = router