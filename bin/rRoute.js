
var key = require('apiKEYS.json');

function init(https,express,app){

// rRoute
app.use('/fpdb',function(req,res){
  const option = {
    'host':'api.flightplandatabase.com',
    'path':'/plan/' + req.query.flightID,
    'headers':{
      'username': key['rRoute'],
      'Content-Type': 'application/json; charset=utf-8',
      'X-API-Version': 1,
      'X-Units': 'SI',
      'X-Limit-Cap': 100,
      'X-Limit-Used': 1
    }
  };
  https.request(option,function(response){
    var rspData = '';
    response.on('data',function(chunk){
      rspData += chunk;
    });
    response.on('end',function(){

      console.log('Flight Plan ' + JSON.parse(rspData)['id']);

      var route = 'Flight Plan ' + JSON.parse(rspData)['id'] + ' from ' + JSON.parse(rspData)['fromName'] + ' to ' + JSON.parse(rspData)['toName'] + '\n';

      var waypoint = [];

      for (var i = 0; i < JSON.parse(rspData)['waypoints']; i++)
      {
        var radiation = 0;
        var radiationTotal = 0;

        var latitude = JSON.parse(rspData)['route']['nodes'][i]['lat'];
        var longitude = JSON.parse(rspData)['route']['nodes'][i]['lon'];

        waypoint.push('Waypoint[' + i + ']: '+'Latitude= ' + latitude + ' Longitude= ' + longitude);

        //some code to get the radiation

        radiationTotal = radiation * 100 / 3.11;

        console.log('Waypoint[' + i + ']: '+ 'Latitude= ' + latitude + ' Longitude= ' + longitude + ' Ionizing Radiation ' + radiation + ' millisieverts' + ' % of total ' + radiationTotal);

        // route = route + 'Waypoint[' + i + ']: '+ 'Latitude= ' + latitude + ' Longitude= ' + longitude + ' Ionizing Radiation ' + radiation + ' millisieverts' + ' % of total ' + radiationTotal + '\n';

      } // for

      route = route + ' Galactic Radiation Received in Flight ' + radiation + ' millisieverts' + ' % of total ' + radiationTotal + '\n';

      res.end(route);
    });

  }).end();
});
}

module.exports = init;
