import { RequestHandler } from "express";
const express = require("express");
const dotnev = require('dotenv');

dotnev.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

const testRequest: RequestHandler = (_req, res) => {
  res.status(200).json({ message: 'Back-end created'});
}

app.get('/', testRequest);

app.listen(port, () => {
console.log("🚀 [server]: Server is running at port: ", port)
  
})