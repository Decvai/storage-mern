function filePath(filePath, staticPath) {
	return function (req, _, next) {
		req.filePath = filePath;
		req.staticPath = staticPath;
		next();
	};
}

module.exports = filePath;
