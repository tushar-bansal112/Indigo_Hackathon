const express = require("express");
const route = require("./routes/route");
const app = express();
const PORT = 8080;
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./database/db");

app.use(bodyParser.json());
app.use(cors({ origin: true }));
app.use("/", route);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
