var express = require("express"),
 	router  = express.Router({mergeParams: true}),
 	Image = require("../models/newimage"),
	middleware = require("../middleware"),
 	Comment = require("../models/comments");

router.post("/collections/:id/comments",middleware.isLoggedIn,(req, res) =>{
   Image.findById(req.params.id, function(err, castle){
       if(err){
           console.log(err);
           res.redirect("/collections");
       } else {
        Comment.create(req.body.comment, function(err, comment){
           if(err){
               console.log(err);
           } else {
               //add username and id to comment
               comment.author.id = req.user._id;
               comment.author.username = req.user.username;
               //save comment
               comment.save();
               castle.comments.push(comment);
               castle.save();
			   req.flash("success","Successfully added comment");
               res.redirect('/collections/' + castle._id);
           }
        });
       }
   });
});

router.delete("/collections/:id/comments/:comment_id",middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
       if(err){
           res.redirect("back");
       } else {
           res.redirect("/collections/" + req.params.id);
       }
    });
});
module.exports = router;