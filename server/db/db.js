const Sequelize = require("sequelize");

const db = new Sequelize(
	process.env.DATABASE_URL || "postgres://localhost:5432/messenger",
	{
		logging: false,
	}
);

const connectToDb = async () => {
	try {
		await db.authenticate();
		console.log("Connection to database successful");
	} catch (error) {
		console.error("Unable to connect to the database", error.message);
	}
};

connectToDb()

module.exports = db;
