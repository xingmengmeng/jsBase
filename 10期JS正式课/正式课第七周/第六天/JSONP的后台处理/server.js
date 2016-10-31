var http = require('http'),
    url = require('url'),
    fs = require('fs');
var server = http.createServer(function (req, res) {
    var urlObj = url.parse(req.url, true),
        pathname = urlObj.pathname,
        query = urlObj.query;

    //->客户端请求的是GET ALL地址,我们把DATA.JSON中的全部数据返回给客户端(客户端使用的是JSONP请求)
    if (pathname === '/getAll') {
        var callback = query['cb'];//->客户端传递的函数名就在这里存着
        var data = fs.readFileSync('./json/data.json', 'utf-8');//->把需要返回给客户端的数据准备好
        var result = callback + '(' + data + ')';//->把需要返回给客户端的最终内容准备好:函数名(数据) fn(...)

        res.writeHead(200, {'content-type': 'text/javascript;charset=utf-8;'});
        res.end(result);
    }
});
server.listen(80, function () {
    console.log('ok');
});