const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const start = require("./bot/commands");
const  path  = require("path");


require("dotenv").config();


const port = process.env.PORT || 9090;
const app = express();

app.use(express.json());

app.use(cors());

app.use(require("./db/routs"));
app.use(
  express.static(path.join(__dirname, "/db/uploads/"))
);
console.log(path.join(__dirname, "/db/uploads/"));

mongoose
  .connect(process.env.MONGO_SERVER)
  .then(() => console.log("The server is started"))
  .catch(() => console.log("Server error MONGO"));

app.listen(port, () => {
  console.log(`The server is started successfully: http://localhost:${port}`);
});



start();
