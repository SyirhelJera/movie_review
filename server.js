if (process.env.NODE_ENV !== "production"){
    require("dotenv").config()
}

const express = require('express')
const app = express();
const https = require('https')
const mongoose = require('mongoose')
const ejs = require('ejs')
const bcrypt = require('bcrypt')
const bodyparser = require('body-parser')
const passport = require('passport')
const flash =  require('express-flash')
const session = require('express-session')
const Movie = require('./models/Movies')
const User = require('./models/User')
const Post = require('./models/Post')
const { title, allowedNodeEnvironmentFlags } = require('process')
const { connect } = require('http2');
const bodyParser = require("body-parser");
const uri = "mongodb+srv://admin:adminpassword@CCAPDEV.4i3mcim.mongodb.net/phase2?retryWrites=true&w=majority"


app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
const authRoute = require("./models/auth")

app.set("view engine", "ejs");
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use((req, res, next) => { //This middleware checks the local user
    res.locals.user = req.session.user
    next()
  })

// CONNECT TO MONGODB
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => app.listen(3000, function(){
            console.log("Server started on port 3000");
        }))
        .catch((err) => console.log(err));


app.use('/', authRoute);

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/images"));



// Home Route
app.get("/",function(req,res){
    Movie.find()
    .then((result) => {
        testmovie = result;
        res.render("index.ejs",testmovie);
        })
    .catch((err) => {
        console.log(err);
    })
   
    console.log("ENTERED userin res REnder");
 });


// Movie Route
app.get("/movies",function(req,res){
    Movie.find()
    .then((result) => {
        testmovie = result;
        res.render("movies.ejs",testmovie);
        })
    .catch((err) => {
        console.log(err);
    })
   
    console.log("ENTERED userin res REnder");
 });


// TV-Series Route
app.get("/tvseries",function(req,res){
    
        res.render("tvSeries.ejs");
        console.log("tvSeries.ejs entered");
    });

/// Register Route
app.get("/register",function(req,res){

    // renders the register page
        res.render("register.ejs");
    });

// USER REGISTRATION MODULE

app.post("/register", async function(req,res){

    // Generate Console message to make sure that this segment is working
    console.log(req.body)
   
    // gets the variables from the form in register.ejs
    const {username, email} = req.body;

    // Hashes the password before it gets sent to the database
    const hashedPassword = await bcrypt.hash(req.body.password,10)

    // The User Data that gets sent to the database
    const user1 = new User({
        username: username,
        email: email,
        password: hashedPassword,
    })

    // Code that sends the data to the database
    user1.save()
    .then((result) => {

    //  redirects the user to the login page after signing in
        res.redirect("/login")
    })
    .catch((err) =>{
        console.log(err);
        res.redirect("/register")
    })

        console.log("register.ejs entered");
    });


// Login Route
app.get("/login",function(req,res){
    res.render("login.ejs");
    console.log("ENTERED login res REnder");
 });


 // UserIn Route
 app.get("/userin",function(req,res){
    Movie.find()
    .then((result) => {
        testmovie = result;
        res.render("userin.ejs",testmovie);
        })
    .catch((err) => {
        console.log(err);
    })
   
    console.log("ENTERED userin res REnder");
 });
  
 app.post("/add-comment", function(req, res){
    console.log(req.body)
    const user = "anton"
    const comment = req.body.comment;
    res.redirect(req.get('referer'))
}
 )
 // Profile Route
  app.get("/profile",function(req,res){
    let userdata;

    User.find({ username: 'anton'}, function (err, data) {
        if (err){
            console.log(err);
        }
        else{
            userdata = data;
            console.log("First function call : ", userdata);
        }
    });
    Movie.find(function (err, data) {
        if (err){
            console.log(err);
        }
        else{
            testmovie = data;
       
         
      res.render('profile', { testmovie: testmovie, userdata: userdata });

        }
    });
 });

// ADD MOVIE TO WATCHLIST NEED TO MOVE TO CONTROLLERS SOON
 app.post("/addWatchlist",function(req,res){

    let userdata;

    User.find({ username: 'anton'}, function (err, data) {
        if (err){
            console.log(err);
        }
        else{
            userdata = data;
            console.log('Got this from the get:', req.body.movieSelected);
        }
    });

 });
    
 app.get("/about", function(req,res){
    res.render("about.ejs")
 })
    

// MOVIE PAGE ROUTES
// Interstellar
app.get("/interstellar",function(req,res){

    Movie.find({ title: 'Interstellar'}, function (err, data) {
        if (err){
            console.log(err);
        }
        else{
            testmovie = data;
         //   console.log("First function call : ", data);
            res.render("moviePage.ejs",testmovie);
        }
    });

});

// 500 days
app.get("/500Days",function(req,res){

    Movie.find({ title: '500 Days of Summer'}, function (err, data) {
        if (err){
            console.log(err);
        }
        else{
            testmovie = data;
         //   console.log("First function call : ", data);
            res.render("moviePage.ejs",testmovie);
        }
    });

});

// One Piece
    app.get("/OnePiece",function(req,res){

        Movie.find({ title: 'One Piece Film: Red'}, function (err, data) {
            if (err){
                console.log(err);
            }
            else{
                testmovie = data;
             //   console.log("First function call : ", data);
                res.render("moviePage.ejs",testmovie);
            }
        });

    });

    // Pulp Fiction
    app.get("/pulpfiction",function(req,res){

        Movie.find({ title: 'Pulp Fiction'}, function (err, data) {
            if (err){
                console.log(err);
            }
            else{
                testmovie = data;
             //   console.log("First function call : ", data);
                res.render("moviePage.ejs",testmovie);
            }
        });
    });

    // your name
    app.get("/yourname",function(req,res){

        Movie.find({ title: 'Your Name.'}, function (err, data) {
            if (err){
                console.log(err);
            }
            else{
                testmovie = data;
             //   console.log("First function call : ", data);
                res.render("moviePage.ejs",testmovie);
            }
        });

    });

    // Parasite
    app.get("/parasite",function(req,res){

        Movie.find({ title: 'Parasite'}, function (err, data) {
            if (err){
                console.log(err);
            }
            else{
                testmovie = data;
             //   console.log("First function call : ", data);
                res.render("moviePage.ejs",testmovie);
            }
        });

    });

    // The Shining
    app.get("/shining",function(req,res){

        Movie.find({ title: 'The Shining'}, function (err, data) {
            if (err){
                console.log(err);
            }
            else{
                testmovie = data;
             //   console.log("First function call : ", data);
                res.render("moviePage.ejs",testmovie);
            }
        });

    });

    // The Shining
    app.get("/dahmer",function(req,res){

        Movie.find({ title: 'Dahmer'}, function (err, data) {
            if (err){
                console.log(err);
            }
            else{
                testmovie = data;
             //   console.log("First function call : ", data);
                res.render("moviePage.ejs",testmovie);
            }
        });

    });
    
