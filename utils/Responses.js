const sendResponse = (res, data = null, message = "Success", status = true, status_code = 200, details = null) => {
	res.status(status_code).json({ data, message, status, details });
};

module.exports = { sendResponse };
