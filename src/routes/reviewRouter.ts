import Router from 'express';
import { postReview, getMyReviews } from '../controllers/reviewController'; 

const router = Router();

router.route('/').post(postReview)
 router.route('/').get(getMyReviews) 

export default router