const router = require('express').Router();
const passport = require('passport')

const User = require('./User');

passport.use(User.createStrategy());

passport.serializeUser(function(user, done){
    done(null,user.id);
});
passport.deserializeUser(function(id,done){
    User.findById(id, function(err, user){
        done(err, user);
    });
});

router.post("/register", async (req, res) =>{
    try{
        // register user
        const registerUser = await User.register({username: req.body.username}, req.body.password);
        if(registerUser){
            passport.authenticate("local")(req, res, function(){
                res.redirect("login");
            });
        }else{
            res.redirect("register")
        }
    }catch(err){
        res.send(err);
    }
});

// User Login

router.post("/login", (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });

    // check user credentials if correct
    req.login(user,(err)=>{
        if(err){
            console.log(err)
        }else{
            passport.authenticate("local")(req, res, function(){
                res.redirect("/userin");
            });
        }
    });
});


//logout user
router.get("/logout", (req, res) =>{
    req.logout();
    res.redirect("/")
})



// export router
module.exports = router;