const express = require('express');
const app = express();
const path=require('path');
const mongoose=require('mongoose');
const methodOverride=require('method-override')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const session = require('express-session');
const flash=require('connect-flash')


const pages=require('./routes/pages')
const auth=require('./routes/auth')
const profile=require('./routes/profile')

const User = require('./models/Users');
const seedDb=require('./seed');

let Url='mongodb+srv://sachin:uTrs1QS7xml5jRjf@cluster0.amqiyir.mongodb.net/todolist?retryWrites=true&w=majority'
// mongoose.set('strictQuery', true);
mongoose.connect(Url)
    .then(() => console.log('Db connected'))
    .catch((err) => console.log("error is : ", err))

app.set('view engine', 'ejs');


app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public')));

app.use(methodOverride('_method'));
app.use(express.urlencoded({extended:true}));

// seedDb();

let configSession = {
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie:{
        httpOnly:true,
        expires:Date.now() + 7*24*60*60*1000,
        maxAge:7*24*60*60*1000
    }
}
app.use(session(configSession));
app.use(flash())


  

// use static authenticate method of model in LocalStrategy
app.use(passport.initialize()); //password
app.use(passport.session());    //password
passport.use(new LocalStrategy(User.authenticate())); //password
// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());   //password
passport.deserializeUser(User.deserializeUser());   //password

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
  });
app.use((req,res,next)=>{
    res.locals.currentUser=req.user;
    next();    
})

app.use(pages);
app.use(auth);
app.use(profile)

app.listen(8080, () => {
    console.log("connect at port:8080 and Databse name is todolist");
})

