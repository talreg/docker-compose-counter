const express = require('express');
const router = express.Router();
const redis = require('redis');
const ServiceResolver=require("../service-resolver")
const defaultRoute="/"

let serviceResolver=new ServiceResolver()
let err_message=""

router.get(defaultRoute, function(req, res, next) {
	const client = redis.createClient(6379,serviceResolver.getDNSforService("redis"));
	client.on("error", err=> {
		err_message=`${serviceResolver.getDNSforService("redis")} server can't be found. ${err}`
	});
	client.on('connect', function() {
	    err_message=""
	});
	if (err_message!=""){
		res.send(err_message)
		return
	}
	client.get("counter",function(err,value){
		if(err){
			res.send("redis error:"+err)
			return
		}
		if (!value){
			value=1;
		}
		res.send("\r\nHello!<br>You are the "+value+" visitor.\r\n<br><hr>NODE_ENV="+process.env["NODE_ENV"]);
		client.set("counter",Number(value)+1,function(){});
	});
});

module.exports = router;
