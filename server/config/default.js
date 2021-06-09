const dotenv = require('dotenv');

dotenv.config();

const config = {
	port: process.env.SERVER_PORT || 3001,
	mongodbUri: process.env.DB_URI,
	secretKey: process.env.SECRET_KEY,
};

module.exports = config;
