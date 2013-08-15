var mongoose = require('mongoose');
var ItemFile = new mongoose.Schema({
	filename: String,
	contentType: String,
	length: Number,
	chunkSize: Number,
	uploadDate: Date,
	aliases: String,
	metadata: String,
	md5: String
});
module.exports = ItemFile;
