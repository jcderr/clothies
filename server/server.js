var http = require('http');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');

var app = express();
var port = 8080;
var ipaddress = '0.0.0.0';
var authSecret = process.env.JWT_SECRET || 'shhhhhhh-secret-123';

var server = http.createServer(app);
server.listen(port, ipaddress, function (){
  console.log('Server Listening on port: '+port);
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../bower_components')));
app.use('/api', expressJwt({ secret: authSecret}));
app.use(function (err, req, res, next){
  if(err.name === 'UnauthorizedError') {
    res.status(401).send('invalid token...');
  }
});



var authorizeRoute = require('./modules/auth.js')(authSecret);
app.use('/auth', authorizeRoute);

// this will be authed using jwt token
app.use('/api/test', function (req, res) {

});
