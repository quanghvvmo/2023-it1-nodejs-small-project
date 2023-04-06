const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/users', userController.createUser);
router.post('/users/login', userController.loginUser);
router.put('/users/:id', userController.updateUser);
router.patch('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);
router.get('/users', userController.getListUsers);
router.get('/users/:id', userController.getUserDetail);

module.exports = router;