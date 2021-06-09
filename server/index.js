const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./routes/auth.routes');
const fileRouter = require('./routes/file.routes');
const corsMiddleware = require('./middleware/cors.middleware');
const fileUpload = require('express-fileupload');
const pathMiddleware = require('./middleware/path.middleware');
const path = require('path');
const config = require('./config/default');

const app = express();
const PORT = config.port;

app.use(fileUpload({}));
app.use(corsMiddleware);
app.use(
	pathMiddleware(
		path.resolve(__dirname, 'files'),
		path.resolve(__dirname, 'static')
	)
);
app.use(express.json());
// app.use(express.static('static'));
app.use(express.static(path.resolve(__dirname, 'static')));
app.use('/api/auth', authRouter);
app.use('/api/files', fileRouter);

const start = async () => {
	try {
		await mongoose.connect(config.mongodbUri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		});

		app.listen(PORT, () => {
			console.log(`Server has been started on http://localhost:${PORT}`);
		});
	} catch (err) {
		console.log('ERROR:', err);
	}
};

start();
