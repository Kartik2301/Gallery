var mongoose = require("mongoose");
var ImageSchema = new mongoose.Schema({
    image:String,
    description:String,
	  author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   },
	  comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ],
	 stars: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Star"
      }
   ]
});

module.exports = mongoose.model("Image",ImageSchema);
