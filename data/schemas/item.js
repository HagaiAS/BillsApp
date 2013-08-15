var mongoose = require('mongoose');
var Schema = require('mongoose').Schema;
var ItemSchema = new mongoose.Schema({
	token: String,
	recipient: String,
	sender: String,
	from: String,
	company: String,
	logo: String,
	subject: String,
	timestamp: Number,
	signature: String,
	"body-html": String,
	file: {
		type: Schema.ObjectId,
		ref: 'ItemFile',
		required: false
	},
	created_at: {
		type: Date,
		'default': Date.now
	}
});
module.exports = ItemSchema;