var http = require('http'),
    url = require('url'),
    fs = require('fs');

var server1 = http.createServer(function (request, response) {
    var urlObj = url.parse(request.url, true),
        pathname = urlObj.pathname,
        query = urlObj.query;
    //console.log(pathname);//->'/index.html'

    //->把请求的资源文件中的源代码获取到
    var conFile = '';
    if (pathname === '/index.html') {
        conFile = fs.readFileSync('./index.html', 'utf-8');
    }

    //->把获取的源代码返回给客户端
    //response.write([content]):向客户端返回内容,返回的内容一般都是字符串格式的(普通字符串/JSON格式的字符串/XML...)
    //response.end():告诉客户端,我们返回的内容都返回结束了,没有要返回的了
    /*response.write(conFile);
     response.end();*/
    response.end(conFile);
});
server1.listen(80, function () {
    console.log('server is success,listening on 80 port!');
});










