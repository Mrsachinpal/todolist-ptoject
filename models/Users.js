const mongoose=require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');


const userSchema=new mongoose.Schema({
    email:{
        type:String,
        trim:true,
        require:true
    },
    phone:{
        type:Number,
        trim:true,
        require:true
    },
    name: {
        type: String,
        trim: true,
        require:true
    },
    

})



userSchema.plugin(passportLocalMongoose);

let User=mongoose.model('user',userSchema);
module.exports=User;