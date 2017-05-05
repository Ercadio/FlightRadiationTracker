var files = [
  'bin/textAnim.js',
  'bin/url.js',
  'bin/clip.js'
];

files.forEach(function(elm){
  var script = document.createElement('script');
  script.src = elm;
  script.type = 'text/javascript';
  document.head.appendChild(script);
});
