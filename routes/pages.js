const express = require('express');
const List = require('../models/List');
const { islogin, userId, isListAuthor } = require('../middleware');
const User = require('../models/Users');
const router = express.Router();

router.get('/', islogin, (req, res) => {
    try {
        res.redirect('/home');
    }
    catch (e) {
        res.status(500).render('error', { err: e.message });
    }
})

router.get('/home', islogin, async (req, res) => {     // showing all list on home page 
    try {
        let items = await List.find({ author: req.user._id })
        res.render('home', { items })
    }
    catch (e) {
        res.status(500).render('error', { err: e.message });
    }
})

router.get('/show', islogin, async (req, res) => {     // showing all list on show page 
    try {
        let items = await List.find({ author: req.user._id })
        res.render('show', { items })
    }
    catch (e) {
        res.status(500).render('error', { err: e.message });
    }
})

router.post('/show', islogin, (req, res) => {
    try {
        let { listitem, priority } = req.body;
        List.create({ listitem, author: req.user._id, priority });

        res.redirect('/show');
    }
    catch (e) {
        res.status(500).render('error', { err: e.message });
    }
})

router.get('/show/:id/edit', isListAuthor, islogin, async (req, res) => {
    try {
        let { id } = req.params;
        let items = await List.find({})
        let foundList = await List.findById(id);
        res.render('edit', { foundList, items })
    }
    catch (e) {
        res.status(500).render('error', { err: e.message });
    }
})

router.patch('/show/:id/edit', islogin, async (req, res) => {
    try {
        let { id } = req.params;
        let { listitem, priority } = req.body;
        await List.findByIdAndUpdate(id, { listitem, priority })
        res.redirect('/show')
    }
    catch (e) {
        res.status(500).render('error', { err: e.message });
    }
})
router.delete('/show/:id', islogin, async (req, res) => {
    try {
        let { id } = req.params;
        await List.findByIdAndDelete(id)
        res.redirect('/show')
    }
    catch (e) {
        res.status(500).render('error', { err: e.message });

    }
})




// router.get('/justcheck',(req,res)=>{
//     res.render('justcheck');
// })

module.exports = router