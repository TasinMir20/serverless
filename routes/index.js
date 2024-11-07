const router = require("express").Router();

const { sendResponse } = require("../utils/Responses");
// const apiRoutes = require("../api/routes/index");

router.all("/", (req, res, next) => {
	try {
		return res.send("Server running");
	} catch (err) {
		next(err);
	}
});

// router.use("/api", apiRoutes); // rest api routes

// catch 404 and forward to error handler
router.use((req, res, next) => {
	const message = "404 | Resource not found!";
	sendResponse(res, null, message, false, 404, null);
});

// error handler
router.use((error, req, res, next) => {
	console.error("Error:", error);

	if (error.status === 422) {
		sendResponse(res, null, "Error", false, error.status, error.details);
		return;
	}

	if (error.name === "ValidationError") {
		sendResponse(res, null, "Error", false, 500, error.errors);
		return;
	}

	const statusCode = error.status || 500;
	const issue = {};

	issue.message = `${error.message}`;
	issue.stack = process.env.NODE_ENV !== "production" ? error.stack : "";

	sendResponse(res, null, issue.message, false, statusCode, statusCode === 400 ? null : issue);
});

module.exports = router;
