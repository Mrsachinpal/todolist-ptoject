const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
    listitem: {
        type: String,
        trim: true,
        required: true // Corrected typo here
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

let List = mongoose.model('List', listSchema);
module.exports = List;
