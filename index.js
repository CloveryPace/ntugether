const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

// route declaration
const application_routes = require("./src/routes/application");
const activity_routes = require('./src/routes/activity');
const plan_routes = require("./src/routes/plan");
const user_routes = require('./src/routes/user.js');

const app = express();

// ADD CORS
var cors = require('cors');
app.use(cors());

// ADD for Oauth
app.options('*', cors());

// use routes
app.use("/application", application_routes);
app.use("/activity", activity_routes);
app.use("/user", user_routes);
app.use("/plan", plan_routes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Health check
app.get('/', (req, res) => {
    // #swagger.tags = ['Hello World!']
    // #swagger.summary = "Health check"
    res.send('Hello World!');
});

// run server
port = 4000;
app.listen(port, () => {
    console.log(`The server is running at http://localhost:${port}`);
});