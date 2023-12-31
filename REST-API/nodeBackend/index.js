const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const todosRouter = require("./routers/routers");

const { PORT, FRONTEND_URL1, FRONTEND_URL2 } = require("./constants/constants");

const app = express();

app.options('*', cors())

app.use((req, res, next) => {
  res.setHeader('Referrer-Policy', 'same-origin');
  next();
});

app.use((req, res, next) => {
  const allowedOrigins = [FRONTEND_URL1, FRONTEND_URL2];

  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Referrer-Policy', 'same-origin');
  next();
});

app.use(bodyParser.json());

app.use(todosRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
