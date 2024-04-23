const mongoose = require('mongoose');
const User = require('./Users');

const listSchema = new mongoose.Schema({
    listitem: {
        type: String,
        trim: true, 
        required: true // Corrected typo here
    },
    priority:{
        type:String,
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }  

});

let List = mongoose.model('List', listSchema);

module.exports = List;
