const swaggerAutogen = require('swagger-autogen')();
require('dotenv').config();

const doc = {
	info: {
		title: 'NTUgether API document',
		description: 'Description',
	},
	host: `${process.env.SWAGGER_HOST}:4000`,
};

const outputFile = './swagger-output.json';
const routes = ['./index.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);
