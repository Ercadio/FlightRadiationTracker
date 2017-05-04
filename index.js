const express = require('express');
const app = express();
const fs = require('fs');
const https = require('https');
const http = require('http');
const request = require('request');
var PORT = 80;

// const skywatchAPI = require('./bin/skywatchAPI');
// skywatchAPI(https,express,app);

// const nasaAPI = require('./bin/nasaAPI');
// nasaAPI(https,express,app);

const gMaps = require('./bin/gMaps');
gMaps(express,app,request);

const gRadiation = require('./bin/gRadiation');
gRadiation(http,express,app);

// const rRoute = require('./bin/rRoute');
// rRoute(https,express,app);

// const flightplan = require('./bin/flightplan');
// flightplan(https,express,app);

app.use(express.static('./app'));
// app.use('/WorldWeather',express.static('./WorldWeather'));

app.listen(PORT,function(){
  console.log('The server is up! Point your browser to localhost:' + PORT);
});
