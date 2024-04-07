const express = require('express');
const List = require('../models/List');
const { islogin } = require('../middleware');
const router = express.Router();

router.get('/', islogin,(req, res) => {
    res.redirect('/home');
})

router.get('/home', islogin,async (req, res) => {     // showing all list on home page 
    let items = await List.find({})
    res.render('home', { items })
})

router.get('/show', islogin,async (req, res) => {     // showing all list on show page 
    let items = await List.find({})
    res.render('show', { items })
})

router.post('/show', islogin,(req, res) => {
    let { listitem } = req.body;
    List.create({ listitem });
    res.redirect('/show');
})

router.get('/show/:id/edit', islogin,async (req, res) => {
    let { id } = req.params;
    let items = await List.find({})
    let foundList = await List.findById(id);
    res.render('edit', { foundList, items })
})

router.patch('/show/:id/edit',islogin ,async (req, res) => {
    let { id } = req.params;
    let { listitem } = req.body;
    await List.findByIdAndUpdate(id, { listitem })
    res.redirect('/show')
})
router.delete('/show/:id', islogin,async (req, res) => {
    let { id } = req.params;
    await List.findByIdAndDelete(id)
    res.redirect('/show')
})




// router.get('/justcheck',(req,res)=>{
//     res.render('justcheck');
// })

module.exports = router