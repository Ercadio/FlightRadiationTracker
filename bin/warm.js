function init(app,request){
  app.use('/warm',function(req,res){
    if(req.query.flightID){
      request('http://localhost/flight?flightID=' + req.query.flightID,function(error,response,body){
        if(error){
          console.log(error);
          res.end();
        }
        else{
          const data = JSON.parse(body);
          const avgSpeed = 250;
          var query = '?DateOfFlight=00%2F2017&Ocode=' + data.fromICAO + '&Dcode=' + data.toICAO + '&NumOfSteps=' + String(data.route.nodes.length - 2) + '&ClimbTime=' + String(data.distance / avgSpeed * 0.02) + '&MinDown=' + String(data.distance / avgSpeed * 0.02) + '&btnSubmit=Continue';
          var index = Math.floor((data.route.nodes.length - 22) / 2);
          if(index < 0) index = 0;
          var len = data.route.nodes.length - 2;
          if(len > 20) len = 20;
          for(var i = 1; i < data.route.nodes.length - 1 && i < 21; i++){
            query += '&StepAlt_' + i + '=' + String(data.route.nodes[index + i - 1].alt);
            query += '&StepMin_' + i + '=' + String(data.distance / avgSpeed * 0.96 / len);
          }
          console.log(query);
          request('http://localhost/grad' + query,function(err,radRsp,radBody){
            if(err){
              console.log(err);
              res.end();
            }
            else{
              res.end(radBody);
            }
          });
        }
      });
    }
    else{
      res.end('{\"isValid\":false}');
    }
  });
}

module.exports = init;
