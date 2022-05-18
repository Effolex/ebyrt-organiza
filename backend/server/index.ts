import { route } from "./routes";
const express = require("express");
const dotnev = require('dotenv');
const cors = require('cors');

dotnev.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

app.use(route);

app.listen(port, () => {
console.log("🚀 [server]: Server is running at port: ", port)
  
})