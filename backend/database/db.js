const mongoose = require("mongoose");

const DB_URL = "mongodb://127.0.0.1:27017/indigo";

mongoose.connect(DB_URL);

mongoose.connection.on("connected", () => {
  console.log("Database Connected...");
});

mongoose.connection.on("error", (err) => {
  console.log("Connected Error: ", err);
});
