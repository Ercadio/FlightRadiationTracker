var files = [
  'bin/mapUpdate.js',
  'bin/waypointHandler.js',
  'bin/mapStyle.js',
  'bin/appearWindow.js',
  'bin/fieldUpdater.js'
];

files.forEach(function(elm){
  var script = document.createElement('script');
  script.src = elm;
  script.type = 'text/javascript';
  document.head.appendChild(script);
});
