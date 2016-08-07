var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var secret;


router.post('/login', function(req, res) {
  findUser(req.body.email, req.body.password, function (error, user) {
    if (error !== undefined) {
      res.status(error.status).send(error.message);
      return;
    }

    var token = generateToken(user);
    res.send({token: token});
  });
});



function findUser(email, password, callback) {
  // get user from db

  var user = {
    first: 'Ben',
    last: 'Rubin'
  };
  callback(undefined, user);
}



// use info from user doc to generate a access token
function generateToken(user) {
  return jwt.sign(user, secret);
}



// contructor function to set token secrets
module.exports = function(_secret) {
	secret = _secret;

	return router;
};
