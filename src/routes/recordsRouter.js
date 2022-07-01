const Router = require('express')
const recordsController = require("../controllers/recordController")

const router = Router();

router.route('/').get(recordsController.getInfo)
router.route('/db').get(recordsController.getDbInfo)
router.route('/').post(recordsController.postInfo)

module.exports = router