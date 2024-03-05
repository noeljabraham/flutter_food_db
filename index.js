var express = require("express"); // importing package "express"
var bodyParser = require("body-parser");
var cors = require("cors");
var helmet = require("helmet");
var useragent = require("express-useragent");
var mongoose = require("mongoose");
let app = express();

var AdminRoute = require("./routes/adminRoute");
var UserRoute = require("./routes/userRoute");
//BODYPARSER
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: "150mb",
  })
);
app.use(bodyParser.json({ limit: "150mb" }));

//DATABASE URL
mongoose
  .connect(
    process.env.MONGOURL ||
      "mongodb+srv://scantoknow2024:scantoknowajce2004@cluster0.eiddyf1.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Data Base connected");
  })
  .catch((ex) => {
    console.log("Db connection error");
    console.log(ex);
  });

//database connection
var db = mongoose.connection;
//Port Declaration
var port = process.env.PORT || 4050;

//Cors
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

//Cors and helmet use
app.use(cors());
app.use(helmet());

//Consoles the user information and API calls into the server Environment
app.use(useragent.express());
app.use((req, res, next) => {
  var fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
  console.log(fullUrl);
  next();
});

app.use(AdminRoute);
app.use(UserRoute);

//Route for checking the server health
app.get("/health", async (req, res) => {
  res.status(200).json({
    status: true,
  });
  return;
});

//Server Environment set up
const server = app.listen(port, function () {
  console.log("Running Server on port " + port);
});

