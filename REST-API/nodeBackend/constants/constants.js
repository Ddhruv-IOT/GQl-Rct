const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  PORT: process.env.PORT || 3001,
  FRONTEND_URL1: process.env.FRONTEND_URL1 || 'https://todo-app-04bu.onrender.com',
  FRONTEND_URL2: process.env.FRONTEND_URL2 || 'https://rest-gql-todo-app.netlify.app', 

};
