const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const config = require("./config");
const dotenv = require("dotenv").config();

// body-parser 設定
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// DB設定
mongoose.Promise = global.Promise;
mongoose.connect(config.database, { userNewUrlParser: true });
mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
  process.exit(-1);
});

// morganを使ってリクエストをコンソール上に出力できるようにする
app.use(morgan("dev"));

// フロントエンドから使えるようにする
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, authorization"
  );
  next();
});

const port = process.env.PORT || 5000;

const router = require("./routes/");
app.use("/api/v1", router);

// start up server
app.listen(port, () => {
  console.log("env:", process.env.KEY_APPLE);
  console.log("Listen on port:", port);
});
