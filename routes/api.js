
/*
 * GET users listing.
 */
//var users = require('../data/users');
var Item = require('../data/models/item');
var formidable = require('../node_modules/connect-multipart-gridform/node_modules/gridform/node_modules/formidable');
var assert = require('assert');
var multipart = require('connect-multipart-gridform');

var logentries = require('node-logentries');

if(process.env.LOGENTRIES_TOKEN){
	var log = logentries.logger({
		token:process.env.LOGENTRIES_TOKEN
	});
}
else{
	var log = logentries.logger({
		token:'60c4eeea-e216-4249-aa44-7316302cf3c8'
	});
}



exports.showall = function(req, res){
  //res.render('api/users', {title: 'Users', users: users});
  Item.find().lean().exec({}, function(err, items) {
		if (err) {
			return next(err);
		}
		//res.render('items', {title: 'Items', items: items});
		return res.end(JSON.stringify(items));
	});
};

exports.calendar = function(req, res){
  //res.render('api/users', {title: 'Users', users: users});
  Item.find().lean().exec({}, function(err, items) {
		if (err) {
			return next(err);
		}
		res.set( {'Content-Type': 'application/json'});
		res.render('api/events', {title: 'Items', items: items},function(err, html) {
		
				res.jsonp(JSON.parse(html));
}		);

	});
};



exports.insert = function(req, res){
        console.log('Request : ',JSON.stringify(req.body));
		Item.findOne({token: req.body.token}, function(err, item) {
				if (err) {
					return next(err);
				}
				if (item) {
					return res.send('Conflict', 409);
				}
				//users[req.body.username] = req.body;
	            console.log('Upload files : ',req.files);
				//log.info(JSON.stringify(req.files));
				//log.info(JSON.stringify(req.body));
				var newItem = req.body;
				
				var matchExact = function (r, str) {
				   if (str.search(r) !== -1)
					  return true
				   else
					  return false
				};
				console.log('body ' + newItem['body-html']);
				if(matchExact(/mailto:DONT-REPLY@013netvision.co.il/,newItem['body-html'])){
				  newItem.company ='Netvision';
				  newItem.logo ='images/logo_netvision.PNG';
				}else{ 
					if(matchExact(/mailto:Bill@orangebill.co.il/,newItem['body-html'])){
					  newItem.company ='Orange';
					  newItem.logo ='images/logo_orange.PNG';
					}else{ 
					  if(matchExact(/mailto:Bill6@kvish6.co.il/,newItem['body-html'])){
						  newItem.company ='Road6';
						  newItem.logo ='images/logo_road6.PNG';
 					 }else{ 
					 	if(matchExact(/@pelephone.co.il/,newItem['body-html'])){
						  newItem.company ='Pelephone';
						  newItem.logo ='images/logo_pelephone.png';
						}else{ 
							if(matchExact(/mailto:support@kama.co.il/,newItem['body-html'])){
							  newItem.company ='Kama';
							  newItem.logo ='images/logo_kama.PNG';
							}else{ 						
								  newItem.company ='NA';
								  newItem.logo ='images/NA.PNG';
							}
						}
					  }
					}
                };				
				
				
				var nNum=1;
				var bLoop = true;
				while(req.files['attachment-'+ nNum] && bLoop){
				    if(req.files['attachment-' + nNum].type ==='application/pdf' ){						 
						newItem.file = req.files['attachment-' + nNum].id;
						bLoop =false;
					}
					nNum=nNum + 1;
				}
					
				Item.create(newItem, function(err) {
					if (err) {
						return next(err);
					};
					res.redirect('/api/list');
					//return res.end(JSON.stringify(req.files));
				});
				
			});
};
exports.delitem = function(req, res, next){
		Item.findOne({token: req.param('token')}, function(err, item) {
				if (err) {
					return next(err);
				}
				if (item.file) {
					req.params.fileId = item.file.toString();
					//console.log('Upload files : ',req.files);
					item.remove(function (err, deleted_item) {
						if (err) {
							return next(err);
						}
						next();						
					});
					
					//res.redirect('/api/list');
					
				}else{
					item.remove(function (err, deleted_item) {
						if (err) {
							return next(err);
						}
						res.send('ok');					
					});
				}
				
			
		});
};
exports.upditem = function(req, res, next){
        console.log('body : ' + JSON.stringify(req.body));
		var timeStamp = (new Date(req.body.start)).getTime() / 1000;
		console.log('timestamp : ' + timeStamp);
		Item.update({token: req.body.id},{timestamp : timeStamp},function (err, numberAffected, raw){
		  if (err) {
					return next(err);
		  }
		  console.log('The number of updated documents was %d', numberAffected);
		  res.send('ok');	
		});
	
};

exports.mobile = function(req, res, next){
    //res.redirect('/m/index.html');
    res.redirect('/m/build/BillsApp/package/index.html');
};
