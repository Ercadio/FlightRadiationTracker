var airports = require('../res/airport.json');
var searchObj = require('./search');
var search = new searchObj(airports);
function init(app){
  // var missed = 0;
  // airports.forEach(function(port){
  //   if(Object.keys(search.findByCode(port.icao)).length === 0){
  //     missed++;
  //   }
  // });
  // console.log((100 * missed / airports.length).toFixed(2) + '% lost');
  app.use('/aircode',function(req,res){
    var code = req.query.code || '';
    var exists = search.findByCode(code);
    if(Object.keys(exists).length === 0){
      res.end('{\"isValid\" : false}');
    }
    else{
      var rsp = '{\"isValid\":true,\"code\":\"' + req.query.code + '\",\"lat\":\"' + String(exists.lat) + '\",\"lon\":\"' + String(exists.lon) + '\"}';
      res.end(rsp);
    }
  });
}
module.exports = init;
