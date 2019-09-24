var express = require('express');
var router = express.Router();
const userCntrl = require('../controllers/user.controller');
const passport = require('passport');
router.post('/register', function (req, res, next) {
    return userCntrl.register(req, res, next);
});
router.post('/login', function (req, res, next) {
    return userCntrl.login(req, res, next);
});
router.get('/me', passport.authenticate('jwt', { session: false }), function (req, res, next) {
    return userCntrl.me(req, res, next);
});

module.exports = router;