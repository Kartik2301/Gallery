var express = require("express"),
	router  = express.Router({mergeParams: true}),
	Image = require("../models/newimage"),
	Follower = require("../models/follower"),
	middleware = require("../middleware"),
	User = require("../models/user");

router.post("/users/:id/followers",middleware.isLoggedIn,(req, res) =>{
   User.findById(req.params.id, function(err, user){
       if(err){
           console.log(err);
           res.redirect("/collections");
       } else {
		     var author = {
      id: req.user._id,
      username: req.user.username
  	 };
		   var newFollower = {author:author};
        Follower.create(newFollower, function(err, follower){
           if(err){
               console.log(err);
           } else {
               //add username and id to comment
               //save comment
               follower.save();
               user.followers.push(follower);
               user.save();
               res.redirect('/users/' + user._id);
           }
        });
       }
   });
});

module.exports = router;