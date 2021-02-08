const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/ExpressAPI");
mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
  process.exit(-1);
});

// ポートを開ける
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// body-parser config
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 5000;

const router = require("./routes/");
app.use("/api/v1", router);

// start up server
app.listen(port, () => {
  console.log("Listen on port:", port);
});
