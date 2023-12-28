const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const todosRouter = require("./routers/routers");

const { PORT, FRONTEND_URL } = require("./constants/constants");

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", FRONTEND_URL);
  // You can also use '*' if you want to allow any origin
  // res.header("Access-Control-Allow-Origin", "*");
  next();
});

// Enable other CORS-related headers and methods
app.use(cors());

app.use(bodyParser.json());

app.use(todosRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
