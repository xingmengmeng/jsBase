var http = require('http'),
    url = require('url'),
    fs = require('fs');
var server1 = http.createServer(function (request, response) {
    var urlObj = url.parse(request.url, true),
        pathname = urlObj.pathname,
        query = urlObj.query;

    //->处理客户端静态资源文件的请求(HTML/CSS/JS/IMG...)
    var reg = /\.([0-9a-zA-Z]+)/i;
    if (reg.test(pathname)) {
        //->首先通过正则获取当前请求文件的后缀名,再拿后缀名获取对应的MIME类型
        var suffix = reg.exec(pathname)[1].toUpperCase(),
            suffixMIME = 'text/plain';
        switch (suffix) {
            case 'HTML':
                suffixMIME = 'text/html';
                break;
            case 'CSS':
                suffixMIME = 'text/css';
                break;
            case 'JS':
                suffixMIME = 'text/javascript';
                break;
        }

        //->获取请求资源文件中的内容,并且返回给客户端(为了防止请求的资源不存在,服务出现异常,我们使用TRY CATCH处理,如果请求的资源不存在的话,我们返回404即可)
        var conFile = 'NOT FOUND!',
            status = 404;
        try {
            conFile = fs.readFileSync('.' + pathname, 'utf-8');
            status = 200;
        } catch (e) {
            suffixMIME = 'text/plain';
        }
        response.writeHead(status, {'content-type': suffixMIME + ';charset=utf-8;'});
        response.end(conFile);
    }
});
server1.listen(80, function () {
    console.log('server is success,listening on 80 port!');
});










