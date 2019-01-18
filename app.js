var express = require("express"),
  bodyParser = require("body-parser"),
  methodOverride = require("method-override"),
  mongoose = require("mongoose"),
  multer = require("multer"),
  cloudinary = require("cloudinary"),
  cloudinaryStorage = require("multer-storage-cloudinary"),
  passport = require("passport"),
  User = require("./models/User"),
  LocalStrategy = require("passport-local");
app = express();

//routes
var receiptRoutes = require("./routes/receipts"),
  authRoute = require("./routes/index");

//passport config

app.use(
  require("express-session")({
    secret: "Diego is king",
    resave: false,
    saveUninitialized: false
  })
);

cloudinary.config({
  cloud_name: "nikolaisen",
  api_key: "625715579971715",
  api_secret: "-UBibRSmAg71tUjwrIoqlghFLCw"
});

const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: "Receipts",
  allowedFormats: ["jpg", "png"],
  transformation: [{ width: 500, height: 500, crop: "limit" }]
});
const parser = multer({ storage: storage });
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

mongoose.connect(
  "mongodb://localhost/receiptApp",
  { useNewUrlParser: true }
);

/* app.get("/", function(req, res) {
  res.render("index");
});
app.get("/dashboard", function(req, res) {
  res.render("dashboard", { User: User });
});
app.get("/login", function(req, res) {
  res.render("login");
}); */
app.use("/", authRoute);
app.use("/receipts", receiptRoutes);
app.listen(3000, function() {
  console.log("server is online!");
});
