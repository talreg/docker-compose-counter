var express = require('express');
var router = express.Router();
var redis = require('redis');
var redisHost="redis";
var redisHost="localhost";
//var redisHost="192.168.0.4";

redis.createClient(6379,redisHost).set("counter",1,function(){})
/* GET home page. */
router.get('/', function(req, res, next) {
		var client = redis.createClient(6379,redisHost);
		client.get("counter",function(err,value){
		res.send("\r\nHello!<br>You are the "+value+" visitor.\r\n<br><hr>NODE_ENV="+process.env["NODE_ENV"]);
		client.set("counter",Number(value)+1,function(){});
	});
});

module.exports = router;
