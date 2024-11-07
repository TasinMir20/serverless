const mongoose = require("mongoose");

let isConnected; // Track the connection status globally

async function databaseConnection() {
	if (isConnected) {
		console.log("🔗 Using existing database connection.");
		return;
	}

	const DB_URI = process.env.DB_URI;

	try {
		console.log("🔗 Connecting to the database...");
		const db = await mongoose.connect(DB_URI);

		isConnected = db.connections[0].readyState;
		console.log("✅ Database connection successful.");
	} catch (error) {
		console.error("❌ Database connection failure");
		console.error(error);
		throw error;
	}
}

module.exports = databaseConnection;
