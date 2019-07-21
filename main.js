var express = require("express"),
 	app = express(),
 	mongoose = require("mongoose"),
 	passport = require("passport"),
 	LocalStrategy = require("passport-local"),
 	passportLocalMongoose = require("passport-local-mongoose"),
 	User = require("./models/user"),
	flash = require("connect-flash"),
 	Image = require("./models/newimage"),
 	Star = require("./models/stars"),
	cookieParser = require("cookie-parser"),
  	Comment = require("./models/comments"),
	Follower = require("./models/follower"),
 	bodyParser = require("body-parser"),
 	methodOverride = require("method-override"),
	commentRoutes    = require("./routes/comments"),
	indexRoutes    = require("./routes/index"),
	collectionsRoutes = require("./routes/collections"),
	starRoutes    = require("./routes/star"),
	followerRoutes = require("./routes/follower"),
	request = require("request");

app.use(flash());
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({extened:true}));

mongoose.connect("mongodb://localhost:27017/datastorage5", {useNewUrlParser : true});

app.use(require("express-session")({
    secret: "Ned Stark",
    resave: false,
    saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.success = req.flash('success');
   res.locals.error = req.flash('error');
   next();
});

app.use(commentRoutes);
app.use(starRoutes);
app.use(indexRoutes);
app.use(collectionsRoutes);
app.use(followerRoutes);

app.listen(3000,process.env.IP,function(){
    console.log("Server has started");
});