var express = require("express"),
 	router  = express.Router(),
 	Image =   require("../models/newimage"),
 	Comment = require("../models/comments"),
 	request = require("request"),
	middleware = require("../middleware"),
 	photoCollections = [], 
    resultsArray = [];

request('https://api.unsplash.com/photos/?client_id=0679aa4d93bcd859271371a9feb511d862ec0e5c1205d7f4d9081bc5df9e9fe9', function (error, response, body) {
  if (!error && response.statusCode == 200) {
	var parsedData = JSON.parse(body);
	  console.log(parsedData.length);
	for(var i=0;i<9;i++){
	photoCollections[i] = parsedData[i].urls.full;
	}
  }
  
});

//landing page
router.get("/",(req,res) => {
	res.render("landing.ejs",{photoCollections:photoCollections});
});

//all images
router.get("/collections",(req, res) =>{
    var noMatch = null;
    if(req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        // Get all campgrounds from DB
        Image.find({description: regex}, function(err, imageUnit){
           if(err){
               console.log(err);
           } else {
              if(imageUnit.length < 1) {
                  noMatch = "No campgrounds match that query, please try again.";
              }
              res.render("collections.ejs",{imageUnit:imageUnit, noMatch: noMatch});
           }
        });
    } else {
        // Get all campgrounds from DB
        Image.find({}, function(err, imageUnit){
           if(err){
               console.log(err);
           } else {
              res.render("collections.ejs",{imageUnit:imageUnit, noMatch: noMatch});
           }
        });
    }
});

// get started
router.get("/GettingStarted",(req,res) => {
	Image.find({}, function(err, imageUnit){
        if(err){
               console.log(err);
           } else {
              res.render("gettingstarted.ejs",{imageUnit:imageUnit});
           }
        });
});


router.get("/results",function(req,res){
	var toSearch = req.query.search;
	console.log(toSearch);
	var data = {
   url : "http://api.pexels.com/v1/search?per_page=30&page=1&query=" + toSearch,
   headers: {
     'Authorization': '563492ad6f917000010000011a743ccfb22e4b8a94d19f5cbd2e1064'
   } 
};
	request(data, function(error,response, body){
 if(!error && response.statusCode == 200){
	 var parsedData2 = JSON.parse(body);
      resultsArray = parsedData2["photos"];
	 console.log(resultsArray.length);
	 res.render("results.ejs",{resultsArray:resultsArray, toSearch:toSearch});
  }
});
	
});

router.post("/collections",middleware.isLoggedIn,(req, res) =>{
  // get data from form and add to campgrounds array
  var image = req.body.image;
  var desc = req.body.description;
  var author = {
      id: req.user._id,
      username: req.user.username
  };
    var newCampground = {image: image, description: desc, author:author};
    Image.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            res.redirect("/collections");
        }
    });
  
});

router.get("/collections/:id",(req, res) =>{
    Image.findById(req.params.id).populate("comments").populate("stars").exec(function(err, foundImage){
        if(err){
            console.log(err);
        } else {
            res.render("show.ejs", {image:foundImage});
        }
    });
});

router.delete("/collections/:id",middleware.checkCampgroundOwnership,(req,res) =>{
   Image.findByIdAndDelete(req.params.id,function(err,toDelete){
       if(err){
           console.log(err);
       }else{
           res.redirect("/collections");
       }
   });
});



function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

module.exports = router;

