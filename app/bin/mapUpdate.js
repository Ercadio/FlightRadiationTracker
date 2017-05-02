function updateMap(){
  if(fullField()){
    map = undefined;
    flightPath = undefined;
    initMap();
    center.lat = 0;
    center.lng = 0;
    markers = [];
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
      flightPath.getPath().insertAt(i++,new google.maps.LatLng(Number(point.children[0].value),Number(point.children[1].value)));
    });
    center.lat /= waypointList.length + 2;
    center.lon /= waypointList.length + 2;
  }
}

function fullField(){
  var isFull = true;
  var list = document.getElementsByTagName('input');
  var i = 0;
  while(list[i] != undefined){
    if(list[i].value === ''){
      isFull = false;
      break;
    }
    i++;
  }
  return isFull;
}
