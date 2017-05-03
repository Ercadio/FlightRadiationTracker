var key = require('apiKEYS.json');

function init(https,express,app){

// rRoute
app.use('/flight',function(req,res){
  const option3 = {
    'host':'api.flightplandatabase.com',
    'path':'/plan/' + req.query.flightID,
    'headers':{
      'username': key['rRoute'],
      'Accept': 'application/json; charset=utf-8',
      'X-Units': 'SI'
    }
  };
  https.request(option3,function(response){
    var rspData = '';

    response.on('data',function(chunk){
      rspData += chunk;
    });

    response.on('end',function(){

     console.log('Flight Plan ' + JSON.parse(rspData)['id']);

      const data = JSON.parse(rspData);

      if(data.message != '' || data.message != undefined){
        console.log('api.flightplandatabase.com: ' + data.message,response.headers);

        res.end('');
      }
      else{
        var route = '[';

        for (var i = 0; i < JSON.parse(rspData)['waypoints']; i++)
        {

          var latitude = JSON.parse(rspData)['route']['nodes'][i]['lat'];
          var longitude = JSON.parse(rspData)['route']['nodes'][i]['lon'];

          route = route + '{' + '"lat": ' + latitude + ', "lon": ' + longitude + '}';
          if (i < JSON.parse(rspData)['waypoints']-1)
          {
            route = route +',';
          }

        } // for

        route = route + ']';
        console.log('api.flightplandatabase.com: ' + route);
        res.end(route);
     }
    });

  }).end();
});
}

module.exports = init;
