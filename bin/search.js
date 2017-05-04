function node(obj){
  this.obj = obj;
  this.left = {};
  this.right = {};
}
function bst(array){
  if(array[Math.floor(array.length/2)]){
    this.root = new node(array[Math.floor(array.length/2)]);
  }
  else{
    this.root = {};
  }
  this.add = function(rt,arr){
    if(arr.length != 0){
      var middle = Math.floor(arr.length/2);
      var middleL = Math.floor(middle/2);
      var middleR = Math.floor(middle/2) + middle + 1;
      if(arr[middleL] === undefined || middleL === middle){
        rt.left = {};
      }
      else{
        rt.left = new node(arr[middleL]);
      }
      if(arr[middleR] === undefined || middleR === middle){
        rt.right = {};
      }
      else{
        rt.right = new node(arr[middleR]);
      }
      this.add(rt.left,arr.slice(0,middle));
      this.add(rt.right,arr.slice(middle+1,arr.length));
    }
  }
  this.add(this.root,array);
  this.findByCode = function(value){
    return this.searchByCode(this.root,value);
  }
  this.searchByCode = function(nde, value){
    if(nde != undefined && nde.obj != undefined){
      if(Object.keys(nde).length != 0 && Object.keys(nde.obj).length != 0 && nde.obj['icao'] === value){
        return nde.obj;
      }
      else if(Object.keys(nde).length != 0 && Object.keys(nde.left).length != 0 && Object.keys(nde.obj).length != 0 && value < nde.obj['icao']){
          return this.searchByCode(nde.left,value);
        }
      else if(Object.keys(nde).length != 0 && Object.keys(nde.right).length != 0 && Object.keys(nde.obj).length != 0 && value > nde.obj['icao']){
          return this.searchByCode(nde.right,value);
      }
    }
    return {};
  }
}
function hashTable(array){
  this.size = 500;
  this.hash = function(icao){
    var h = 5381;
    for(var i = 0; i < icao.length; i++){
      h = (h ^ icao.charCodeAt(i)) % this.size;
    }
    return h % this.size;
  }
  this.table = new Array(this.size);
  this.table.fill([],0,this.size);
  for(var n in array){
    this.table[this.hash(array[n].icao)].push(array[n]);
  }
  this.findByCode = function(icao){
    var found = {};
    this.table[this.hash(icao)].forEach(function(elm){
      if(elm.icao === icao){
        found = elm;
      }
    });
    return found;
  }
}
// function searchObj(array){
//   this.store = array;
//   this.findByCode = function(icao){
//     return this.searchRecursive(icao,array);
//   }
//   this.searchRecursive = function(icao,arr){
//     if(arr.length === 0){
//       return {};
//     }
//     else if(icao === arr[Math.floor(arr.length/2)]['icao']){
//       return arr[Math.floor(arr.length/2)];
//     }
//     else if(icao < arr[Math.floor(arr.length/2)]['icao']){
//       return this.searchRecursive(icao,arr.slice(0,Math.floor(arr.length/2)));
//     }
//     else if(icao > arr[Math.floor(arr.length/2)]['icao']){
//       return this.searchRecursive(icao,arr.slice(Math.floor(arr.length/2)+1,arr.length));
//     }
//   }
// }


module.exports = hashTable;
