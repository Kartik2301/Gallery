var mongoose = require("mongoose");

var starSchema = mongoose.Schema({
    text: {type: String, default: 'Shaun Xu'},
    author: {
        id:{
             type: mongoose.Schema.Types.ObjectId,
             ref: "User"
        },
        username: String
    }
});

module.exports = mongoose.model("Star", starSchema);