const Router = require('express')
 
const userController = require('../controllers/userController') 

const router = Router();

router.route('/').post(userController.createUser)
router.route('/').get(userController.getAllUsers)
router.route('/:id').get(userController.getUsersById)
router.route('/:id').delete(userController.deleteUser)
router.route('/:id').put(userController.updateUser)


module.exports = router

