// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const todosRouter = require("./routers/routers");

// const { PORT, FRONTEND_URL } = require("./constants/constants");

// const app = express();

// // app.use((req, res, next) => {
// //   res.header("Access-Control-Allow-Origin", FRONTEND_URL);
// //   // You can also use '*' if you want to allow any origin
// //   // res.header("Access-Control-Allow-Origin", "*");
// //   next();
// // });

// // Enable other CORS-related headers and methods
// app.use(cors(
//   {
//     origin:"https://todo-app-04bu.onrender.com/"
//   }
// ));

// app.use((req, res, next) => {
//   res.setHeader('Referrer-Policy', 'same-origin');
//   next();
// });
// app.use(bodyParser.json());

// app.use(todosRouter);

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });


const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const todosRouter = require("./routers/routers");

const { PORT, FRONTEND_URL } = require("./constants/constants");

const app = express();

// Enable other CORS-related headers and methods

app.use(cors({
  origin: "https://todo-app-04bu.onrender.com"
}));

// app.options('*', cors())

// app.options('*', cors());

app.use((req, res, next) => {
  res.setHeader('Referrer-Policy', 'same-origin');
  next();
});
app.use((req, res, next) => {
const allowedOrigins = ['https://todo-app-04bu.onrender.com', 'https://rest-gql-todo-app.netlify.app/'];

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

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', 'https://todo-app-04bu.onrender.com');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//   res.setHeader('Access-Control-Allow-Credentials', 'true');
//   res.setHeader('Referrer-Policy', 'same-origin');
//   next();
// });

app.use(bodyParser.json());

app.use(todosRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
