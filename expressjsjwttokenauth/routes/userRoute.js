import express from 'express';
const router=express.Router();
import UserController from '../controllers/schema1userController.js';
import checkuserauth from '../middlewares/auth-middleware.js';

router.use('/changepass',checkuserauth)
router.use('/loggeduser',checkuserauth)

router.post('/registration',UserController.userRegistration)
router.post('/login',UserController.login)
router.post('/senduserpasswordresetemails',UserController.senduserpasswordresetemail)
router.post('/reset-password/:id/:token',UserController.userpasswordreset)

//protected routes
router.post('/changepass',UserController.changepassword)
//yaha get likha q k data retrieve kr rhe yaha
router.get('/loggeduser',UserController.loggedUser)
export default router
