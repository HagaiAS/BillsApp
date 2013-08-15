module.exports = exports = function (db) {

  var AM = require('./modules/account-manager')(db);
  var CT = require('./modules/country-list');
  var EM = require('./modules/email-dispatcher');
  
  return {
		login : function(req, res){
		// check if the user's credentials are saved in a cookie //
			if (req.cookies.user == undefined || req.cookies.pass == undefined){
				res.render('users/login', { title: 'Hello - Please Login To Your Account' });
			}	else{
		// attempt automatic login //
				AM.autoLogin(req.cookies.user, req.cookies.pass, function(o){
					if (o != null){
						req.session.user = o;
						res.redirect('/home');
					}	else{
						res.render('users/login', { title: 'Hello - Please Login To Your Account' });
					}
				});
			}
		},
		login_onpost : function(req, res){
			AM.manualLogin(req.param('user'), req.param('pass'), function(e, o){
				if (!o){
					res.send(e, 400);
				}	else{
					req.session.user = o;
					if (req.param('remember-me') == 'true'){
						res.cookie('user', o.user, { maxAge: 900000 });
						res.cookie('pass', o.pass, { maxAge: 900000 });
					}
					res.send(o, 200);
				}
			});
	    },
		// creating new accounts //
	
	   signup : function(req, res) {
			res.render('users/signup', {  title: 'Signup', countries : CT });
	   },
	
	   signup_onpost :function(req, res){
			AM.addNewAccount({
				name 	: req.param('name'),
				email 	: req.param('email'),
				user 	: req.param('user'),
				pass	: req.param('pass'),
				country : req.param('country')
			}, function(e){
				if (e){
					res.send(e, 400);
				}	else{
					res.send('ok', 200);
				}
			});
	   }


  
  }
  
 }