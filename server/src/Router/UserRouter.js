const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/UserController');

router.get('/get-all', UserController.getAllUser);
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.put('/update/:id', UserController.updateUser);
router.delete('/delete/:id', UserController.deleteUser);
router.put('/change-password/:id', UserController.changePassword);
router.get('/get-one/:id', UserController.getUserById);

module.exports = router;