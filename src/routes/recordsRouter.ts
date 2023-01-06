import Router from 'express';
import { getInfo, getDbInfo, postInfo } from "../controllers/recordController";

const router = Router();

router.route('/').get(getInfo)
router.route('/db').get(getDbInfo)
router.route('/').post(postInfo)

export default router