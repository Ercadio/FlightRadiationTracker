function updateMap(){
  if(fullField()){
    map = undefined;
    flightPath = undefined;
    initMap();
    center.lat = (oridesPoints[0].lat + oridesPoints[1].lat) / 2;
    center.lng = (oridesPoints[0].lng + oridesPoints[1].lng) / 2;;
    markers = [new google.maps.Marker({
      position: oridesPoints[0],
      map: map
    })];
    var i = 0;
    waypointList.forEach(function(point){
      center.lat += Number(point.children[0].value);
      center.lng += Number(point.children[1].value);
      var marker = new google.maps.Marker({
        position: {lat:Number(point.children[0].value),lng:Number(point.children[1].value)},
        map: map
        // icon:{
        //   url:'res/marker.png',
        //   size : new google.maps.Size(30, 30),
        //   origin: new google.maps.Point(0, 0),
        //   anchor: new google.maps.Point(15, 15)
        // }
      });
      markers.push(marker);
    });
    center.lat /= waypointList.length + 2;
    center.lon /= waypointList.length + 2;
    console.log(oridesPoints[0]);
    markers.push(new google.maps.Marker({
      position: Number(oridesPoints[1]),
      map: map
    }));
    markers.forEach(function(pt){
      flightPath.getPath().insertAt(i++,new google.maps.LatLng(Number(pt.position.lat()),Number(pt.position.lng())));
    });
  }
}

function fullField(){
  var isFull = true;
  var list = document.getElementsByTagName('input');
  var i = 0;
  while(list[i] != undefined){
    if(list[i].id != 'flightID' && list[i].value === ''){
      isFull = false;
      break;
    }
    i++;
  }
  return isFull;
}
