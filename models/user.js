var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    firstname: String,
	lastname:String,
	username:String,
	email:String,
    password:String,
	imageurl: String,
	desc: {type: String, default: 'Shaun Xu'},
	followers: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Follower"
      }
   ]
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User",UserSchema);