const express = require('express');
const router = express.Router();
const { updateUser, addUser, deleteUser, getAll, getUser, getUserByToken, updateUserByToken } = require('../controllers/userController');
const verifyToken = require('../middlewares/jwt_auth');

router.patch('/update/:id', verifyToken, updateUser);

router.post('/add/', verifyToken, addUser);

router.delete('/delete/:id', verifyToken, deleteUser);

router.get('/', verifyToken, getAll);
router.get('/:id', verifyToken, getUser);

router.get('/token/profile', verifyToken, getUserByToken);

router.get('/token/update', verifyToken, updateUserByToken);

module.exports = router;