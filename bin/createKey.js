const fs = require('fs');
const secureKeys = require('../res/secureKeys.json');
function getKey(){
  var possible = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  var key = "";
  for(var i = 0; i < 30; i++){
    key += possible[Math.ceil(Math.random() * 1000) % possible.length];
  }
  secureKeys.push(key)
  fs.writeFile('./res/secureKeys.json',JSON.stringify(secureKeys),function(err){
    if(err) console.log(err);
  });
  return key;
}

module.exports = getKey;
