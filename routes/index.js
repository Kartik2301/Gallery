var express = require("express"),
 	router  = express.Router(),
 	passport = require("passport"),
 	User = require("../models/user"),
 	Image = require("../models/newimage");

router.get("/signup",(req,res) =>{
	res.render("signup.ejs");
});

// ...rest of the initial code omitted for simplicity.

const { check, validationResult } = require('express-validator');

router.post("/signup",[
  check('email').isEmail(),
  check('password').isLength({ min: 5 }).withMessage("Password must be atleast 5 characters long"),
  check('firstname').isAlpha().withMessage('firstname must not contain any number or special characters'),
  check('lastname').isAlpha().withMessage('lastname must not contain any number or special characters')
],function(req,res){
	const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render("errors.ejs",{array: errors.array()});
	}
    User.register(new User({firstname:req.body.firstname,
	lastname:req.body.lastname,
	username:req.body.username,
	email:req.body.email,
	imageurl:req.body.imageurl,
	desc:req.body.desc}),req.body.password,function(err,user){
        if(err){
            req.flash("error",err.message);
            console.log(err);
        }else{
            passport.authenticate("local")(req,res,function(){
                req.flash("success","Welcome to this website "+ user.username);
                res.redirect("/");
            });
        }
    });
});

router.post("/", passport.authenticate("local", 
    {
        successRedirect: "/collections",
        failureRedirect: "/"
    }), function(req, res){
});

router.get("/logout",(req, res) =>{
    req.logout();
    res.redirect("/");
});

router.get("/users/:id",(req, res) => {
  User.findById(req.params.id).populate("followers").exec(function(err, foundUser) {
    if(err) {
      return res.redirect("/");
    }
    Image.find().where('author.id').equals(foundUser._id).exec(function(err, imgs) {
      if(err) {
        return res.redirect("/");
      }
      res.render("showprofile.ejs", {user: foundUser, images: imgs});
    });
  });
});

module.exports = router;
