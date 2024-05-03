const express = require('express');
const router = express.Router();
const { islogin } = require('../middleware');
const User = require('../models/Users');

router.get('/profile', islogin, async (req, res) => {
    try {
        res.render('profile/profile',)
    }
    catch (e) {
        res.send(e)
    }
})

router.get('/profile/edit', (req, res) => {
    try {
        res.render('profile/profileEdit');
    }
    catch (e) {
        res.send(e)
    }
})



module.exports = router