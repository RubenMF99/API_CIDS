const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const dotEnv = require("dotenv");
const db = require("./models");
const registerRoutes = require("./src/routes");
const app = express();
dotEnv.config();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

registerRoutes(app);

var PORT = process.env.PORT || 5000;

db.sequelize.sync().then(() => {
    app.listen(PORT, () => console.log(`API run on port ${PORT}`));
})