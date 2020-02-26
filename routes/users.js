const express = require('express');
const { getUsers, addUser } = require('../controllers/users');
const passport = require('passport');

const router = express.Router();

router.route('/').get(getUsers).post(addUser);

//Login page
router.get('/login', (req, res) => res.render('login'));

//login handle
router.get(getUsers).post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: 'http://localhost:7000/api/v1/users/login',
        //failureFlash: true
    })(req, res, next);
});
//router.route('/').get(getUsers).post(loginUser);


module.exports = router;