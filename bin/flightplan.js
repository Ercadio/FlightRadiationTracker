var key = require('apiKEYS.json');
var template = JSON.stringify(require('../res/template.json'));
function init(https,express,app){

// rRoute
app.use('/flight',function(req,res){
  console.log(req.query.flightID);
  const option = {
    'host':'api.flightplandatabase.com',
    'path':'/plan/' + req.query.flightID,
    'headers':{
      'username': key['fpdb'],
      'Accept': 'application/json; charset=utf-8',
      'X-Units': 'SI'
    }
  };
  https.request(option,function(response){
    var rspData = '';

    response.on('data',function(chunk){
      rspData += chunk;
    });

    response.on('end',function(){

      if(rspData != '' && rspData != undefined){
        if(rspData === '{"message":"Too Many Requests","errors":null}'){
          res.end(template);
        }
        else{
          res.end(rspData);
        }
      }
      else{
        res.end('');
      }
    });

  }).end();
});
}

module.exports = init;
