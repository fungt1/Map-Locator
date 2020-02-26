const User = require('../models/User');
const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;

// @desc Get all stores
// @routes GET /users
// @access Public
exports.getUsers = async (req, res, next) => {
    try {
        const users = await User.find();

        return res.status(200).json({
            success: true,
            count: users.length,
            data: users
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
}

// @desc Create a store
// @routes POST /users
// @access Public
exports.addUser = async (req, res, next) => {
    try {


        const user = await User.create({
            name: req.body.name,
            password: req.body.password,

        });

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                if (err) throw err;
                user.password = hash;
                user
                    .save()
            });
        });

        return res.status(200).json({
            success: true,
            data: user
        });
    } catch (err) {
        console.error(err);
        if (err.code === 11000) {
            return res.status(400).json({ error: 'This store already exists' });
        }
        res.status(500).json({ error: 'Server error' });
    }
}

// @desc Create a store
// @routes POST /users
// @access Public
let strategy = new LocalStrategy(
    exports.loginUser = async function (name, password, done) {
        let user;
        try {
            user = await User.findOneByName(name);
            if (!user) {
                return done(null, false, { message: 'No user by that email' });
            }
        } catch (e) {
            return done(e);
        }

        let match = await User.comparePassword(password);
        if (!match) {
            return done(null, false, { message: 'Not a matching password' });
        }

        return done(null, user);

    }
)
