const cors = require('cors');
const express = require('express');
const app = express();

const corsMiddleware = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'X-PINGOTHER, Content-Type, Authorization');
  app.use(cors());
  next();
};

module.exports = corsMiddleware;