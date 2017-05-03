var key = require('apiKEYS.json');

function init(https,express,app){
  app.use('/nasa',function(req,res){
    const option = {
      'host':'api.nasa.gov',

      'path':'/planetary/earth/imagery?lon=' + req.query.lon + '&lat=' + req.query.lat + '&cloud_score=True&api_key=' + key['nasaAPI']

    };
    https.request(option,function(response){
      var rspData = ''
      response.on('data',function(chunk){
        rspData += chunk;
      });
      response.on('end',function(){
        res.end(JSON.parse(rspData)['url']);
      });
      response.on('error',function(err){
        console.log(err);
      });
    }).end();
  });
}
module.exports = init;
