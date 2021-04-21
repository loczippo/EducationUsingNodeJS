const express = require('express');
const router = express.Router();

const AuthController = require('../app/controllers/AuthController');
const LoginMiddleware = require('../app/middlewares/LoginMiddleware');
const AuthMiddleware = require('../app/middlewares/AuthMiddleware');

router.put('/:id', AuthController.updateAccount);
router.get('/:id/edit', AuthMiddleware.requireAuth, AuthController.editAccount)
router.put('/:id/changepass', AuthController.changepassword_execute);
router.get('/:id/changepass',AuthMiddleware.requireAuth, AuthController.changepassword);
router.get('/logout',LoginMiddleware.check, AuthController.logout);
router.get('/login',LoginMiddleware.check, AuthController.indexLogin);
router.post('/login/execute', AuthController.loginAccount);
router.post('/signup', AuthController.createAccount);
router.get('/signup',LoginMiddleware.check, AuthController.indexSignUp);
router.get('/', function(req, res, next) {
    res.send('ko co gi o day!')
});

module.exports = router;
