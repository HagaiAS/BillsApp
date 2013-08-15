
/*
 * GET home page.
 */
var Item = require('../data/models/item');
 
exports.index = function(req, res){
  res.render('calendar', { title: 'Hello BILBOX !' });
};

exports.showall = function(req, res){
  //res.render('api/users', {title: 'Users', users: users});
  Item.find({}, function(err, items) {
		if (err) {
			return next(err);
		}
		res.render('items', {title: 'Items', items: items});
	});
};

exports.newitem = function(req, res){
  res.render('new', {title: "New Item",item: ""});
};

