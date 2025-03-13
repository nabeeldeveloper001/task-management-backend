const express = require('express');
const cors = require("cors");
require('dotenv').config();
require("./config/database");
const app = express();

const PORT = process.env.PORT ?? 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

const routes = require("./routes/routes.routes");

app.use(express.json());
app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});