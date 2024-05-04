const express = require('express');
const List = require('../models/List');
const { islogin, userId, isListAuthor } = require('../middleware');
const User = require('../models/Users');
const router = express.Router();

router.get('/', islogin, (req, res) => {            //redirect to home page
    try {
        res.redirect('/home');
    }
    catch (e) {
        res.status(500).render('error', { err: e.message });
    }
})

router.get('/home', islogin, async (req, res) => {      // showing all list on home page 
    try {
        let items = await List.find({ author: req.user._id })
        res.render('home', { items })
    }
    catch (e) {
        res.status(500).render('error', { err: e.message });
    }
})

router.get('/show', islogin, async (req, res) => {      // showing all list on Add list page (edit/delete button)
    try {
        let items = await List.find({ author: req.user._id })
        res.render('show', { items })
    }
    catch (e) {
        res.status(500).render('error', { err: e.message });
    }
})


router.post('/show', islogin, (req, res) => {           //add todo list in database
    try {
        let { listitem, priority,listStatus } = req.body;
        List.create({ listitem,listStatus ,author: req.user._id, priority });

        res.redirect('/show');
    }
    catch (e) {
        res.status(500).render('error', { err: e.message });
    }
})

router.get('/show/:id/edit', islogin, isListAuthor, async (req, res) => {
    try {
        let { id } = req.params;
        let list = await List.findById(id);         // for particular list
        let items = await List.find({ author: req.user._id })           //for all list of particular user
        res.render('edit', {list,items })
    }
    catch (e) {
        res.status(500).render('error', { err: e.message });
    }
})

router.patch('/show/:id/edit', islogin,isListAuthor, async (req, res) => {
    try {
        let { id } = req.params;
        let { listitem, priority,listStatus } = req.body;
        await List.findByIdAndUpdate(id, { listitem, priority,listStatus })
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