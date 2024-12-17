const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const http = require("http");
const app = express();
require("dotenv").config();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
	.connect(process.env.MONGODB_URI, {
		dbName: process.env.DB_NAME,
		// useUnifiedTopology: true,
		// useNewUrlParser: true,
		// createIndexes: true,
	})
	.then(() => console.log("Connected to MongoDB"))
	.catch((err) => console.log("Could not connect to MongoDB", err));

const server = http.createServer(app);

app.use("/ping", (req, res) => {
	return res.status(200).json({ status: "pong" });
});

// 404 For Rest
app.all("*", (req, res, next) => {
	res.status(404).send("Not Found");
});

const listener = server.listen(process.env.PORT || 8000, () => {
	console.log("Your app is listening on port " + listener.address().port);
});
