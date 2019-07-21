var express = require("express"),
	router  = express.Router({mergeParams: true}),
	Image = require("../models/newimage"),
	Star = require("../models/stars"),
	middleware = require("../middleware");

router.post("/collections/:id/stars",middleware.isLoggedIn,(req, res) =>{
   Image.findById(req.params.id, function(err, img){
       if(err){
           console.log(err);
           res.redirect("/collections");
       } else {
		     var author = {
      id: req.user._id,
      username: req.user.username
  	 }
	var text = "like";
		   var newCampground = {text:text, author:author};
        Star.create(newCampground, function(err, star){
           if(err){
               console.log(err);
           } else {
               //add username and id to comment
               //save comment
               star.save();
               img.stars.push(star);
               img.save();
               res.redirect('/collections/' + img._id);
           }
        });
       }
   });
});
module.exports = router;