function init(http,express,app){
  app.use('/grad',function(req,res){
    var post_data = req.url.slice(2,req.url.length);
    const option = {
      'host':'jag.cami.jccbi.gov',
      'path':'/cariresults.asp',
      'method':'POST',
      'headers': {
        'Connection':'keep-alive',
        'Content-Length':Buffer.byteLength(post_data),
        'Cache-Control':'max-age=0',
        'Origin':'http://jag.cami.jccbi.gov',
        'Upgrade-Insecure-Requests':1,
        'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36',
        'Content-Type':'application/x-www-form-urlencoded',
        'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Referer':'http://jag.cami.jccbi.gov/cariprofile2.asp',
        'Accept-Encoding':'gzip, deflate',
        'Accept-Language':'fr-FR,fr;q=0.8,en-US;q=0.6,en;q=0.4',
        'Cookie':'ASPSESSIONIDASSBSDTD=AGMHBALDFHICACMJCPEBHCIJ'
      }
    };
    var post_request = http.request(option,function(response){
      var rspData = '';
      response.on('data',function(chunk){
        rspData += chunk;
      });
      response.on('end',function(){
        var index = rspData.indexOf('millisieverts)');
        var rsp = String(1000*Number(rspData.slice(index - 8, index - 1)));
        if(isNaN(rsp)){
          rsp = '';
        }
        res.end(rsp);
      });
    });
    post_request.write(post_data);
    post_request.end();
  });
}


module.exports = init;
