// <script type="text/javascript" src="flight?flightID=123">

function flightQuery(flightID,callback){
  var request = new XMLHttpRequest;
  request.open('GET', window.location.href + 'flight?flightID=123', true);
  request.onreadystatechange = function(){
    if(request.readyState === XMLHttpRequest.DONE && request.status === 200) {
      const data = JSON.parse(request.responseText);
      callback(data[0]);
    }
  }
  request.send();
}
