const { Router } = require('express');
const { Login, Signup, Profile, Logout } = require('@user/controller');
const { IsLoggedIn, DataValidator } = require('@middleware');

const router = Router();

router.post('/login', DataValidator.handler(Login.bodySchema), Login.handler);
router.post('/signup', DataValidator.handler(Signup.bodySchema), Signup.handler);
router.get('/profile', IsLoggedIn.handler, Profile.handler);
router.post('/logout', IsLoggedIn.handler, Logout.handler);

module.exports = router;