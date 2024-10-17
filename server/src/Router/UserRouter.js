const express = require('express');
const router = express.Router();
const Middleware = require('../Middlewares/MiddleLogin');
const UserController = require('../Controllers/UserController');

router.get('/get-all', Middleware.verifyToken, UserController.getAllUser);
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.put('/update/:id', Middleware.verifyToken, UserController.updateUser);
router.delete('/delete/:id', Middleware.verifyTokenAndAdmin, UserController.deleteUser);
router.put('/change-password/:id', Middleware.verifyToken, UserController.changePassword);
router.post('/refresh-token', UserController.refreshToken);
router.get('/get-one/:id', Middleware.verifyToken, UserController.getUserById);
router.put('/update-role-vip/:id', Middleware.verifyToken, UserController.updateRoleVIP);

module.exports = router;