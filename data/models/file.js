var mongoose = require('mongoose');
var ItemSchema = require('../schemas/file');
var AFile = mongoose.model('AFile', ItemFile);
module.exports = AFile;