const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/Users');

router.get('/login/register', (req, res) => {
    try {
        res.render('./auth/register')
    }
    catch (e) {
        res.status(500).render('error', { err: e.message });
    }
})

router.post('/login/register', async (req, res) => {
    try {
        let { email, name, phone, username, password } = req.body
        let user = new User({ username, name, email, phone });
        let newUser = await User.register(user, password)
        req.flash('success', 'Successfully registered!')
        res.redirect('/login');
    }
    catch (e) {
        res.status(500).render('error', { err: e.message })
    }
})
router.get('/login', (req, res) => {
    try {
        res.render('./auth/login')
    }
    catch (e) {
        res.status(500).render('error', { err: e.message });
    }
})

router.post('/login',
    passport.authenticate('local',
        {
            failureRedirect: '/login/register',
            failureMessage: true
        }),
    function (req, res) {
        
        req.flash('success',`Welcome back! `)
        res.redirect('/home')
    }
)


router.post('/login',              //------- check login details if correct then login else fill correct details-------
    passport.authenticate('local',
        {
            failureRedirect: '/login',
            failureMessage: true
        }),
    function (req, res) {

        res.redirect('/home')
    }
)

router.get('/logout', (req, res) => {
    {
        req.logout(() => {
            res.redirect('/login')
        })
    }
})



module.exports = router