var files = [
  'bin/addField.js',
  'bin/calculator.js'
];

files.forEach(function(elm){
  var script = document.createElement('script');
  script.src = elm;
  script.type = 'text/javascript';
  document.head.appendChild(script);
});
