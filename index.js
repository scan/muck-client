"use strict";

const express = require('express');
const redis = require('redis');
const http = require('http');

const app = express();

app.set('port', process.env.PORT || 3000);

app.use(require('serve-static')(__dirname + '/public'));
app.use(require('morgan')('combined'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html')
});

const server = http.createServer(app);
server.listen(app.get('port'), function () {
  console.log('Server up');
});
