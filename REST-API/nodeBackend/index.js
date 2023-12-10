const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const todosRouter = require("./routers/routers");

const dotenv = require("dotenv");
const dotenvExpand = require("dotenv-expand");
dotenv.config();

const { PORT, FRONTEND_URL } = require("./constants/constants");

const app = express();

app.use(bodyParser.json());
app.use(cors({ origin: FRONTEND_URL }));

app.use(todosRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
