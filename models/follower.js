var mongoose = require("mongoose");

var followerSchema = mongoose.Schema({
    author: {
        id:{
             type: mongoose.Schema.Types.ObjectId,
             ref: "User"
        },
        username: String
    }
});

module.exports = mongoose.model("Follower", followerSchema);