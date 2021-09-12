const { MongoClient } = require('mongodb');
const { logger } = require('./logger');
const url = process.env.CONNECTION_STRING;
const dbName = process.env.DB_NAME;
const mongoose = require('mongoose');
var _db;
module.exports = {

	connectToServer: async function (callback) {
		_db = mongoose.connect(url+ dbName)
		return callback();
		// MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
		// 	_db = client.db(dbName);
		// 	console.log(_db)
		// 	return callback(err);
		// });
	},

	getDb: async function () {
		if (_db) {
			logger.info(`DB connection already exists`)
			return _db;
		} else {
			logger.info(`DB connection not exists, creating new DB connection object`)
			try {
				_db = await MongoClient.connect(url, { useNewUrlParser: true })
				return _db
			} catch (error) {
				console.error(error)
				throw error
			}
		}
	}
};