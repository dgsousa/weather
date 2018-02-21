'use strict';

//require("newrelic");
const express = require('express');
const https = require('https');
const port = process.env.PORT || 4000;
const jsonParser = require('body-parser').json;
const logger = require('morgan');
const favicon = require('serve-favicon');


const routes = require('./routes/routes');




const app = express();

app.use(logger("dev"));
app.use(jsonParser());

app.use('/', express.static('public'));
app.use(favicon('./public/images/cloud.png'));


app.use('/api', routes);


//catch 404 and forward to error handler
app.use((req, res, next) => {
	const err = new Error('Not Found!');
	err.status = 404;
	next(err);
}) 

//Error Handler 
app.use((err, req, res, next) => {
	console.log(err);
	res
		.status(err.status || 500)
		.send({err: {message: err.message}});
}); 

app.listen(port, () => {
	console.log('the server is running on port ' + port);
})  


