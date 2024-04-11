const express = require('express');

// route declaration
const application_routes = require("./src/routes/application");
const activity_routes = require('./src/routes/activity');

const app = express();

// use routes
app.use("/application", application_routes);
app.use("/activity", activity_routes);

// run server
app.listen(4000, () => {
    console.log("server runnung");
});