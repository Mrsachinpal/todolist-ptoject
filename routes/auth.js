const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/Users');

router.get('/login/register', (req, res) => {
    res.render('./auth/register')
})

router.post('/login/register', async (req, res) => {
    let { email, name, phone, username, password } = req.body
    let user = new User({ username, name, email, phone });
    let newUser=await User.register(user, password)
    res.redirect('/login');
})
router.get('/login', (req, res) => {
    res.render('./auth/login')
})

router.post('/login',
    passport.authenticate('local',
        {
            failureRedirect: '/login/register',
            failureMessage: true
        }),
    function (req, res) {
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

router.get('/logout',(req,res)=>{{
    req.logout(()=>{
        res.redirect('/login')
    })
}})



module.exports = router