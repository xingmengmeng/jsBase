var http = require('http'),
    url = require('url'),
    fs = require('fs');
var server1 = http.createServer(function (req, res) {
    var urlObj = url.parse(req.url),
        pathname = urlObj.pathname,
        query = urlObj.query;

    //->处理客户端的静态资源文件请求(HTML/CSS/JS/PNG/GIF/JPG...)
    var reg = /\.([0-9a-zA-Z]+)/i;
    if (reg.test(pathname)) {
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
            /*以后项目中,我们需要把用到的资源文件的MIME都指定好才可以*/
        }

        var conFile = 'NOT FOUND!',
            status = 404;
        try {
            conFile = fs.readFileSync('.' + pathname, 'utf-8');
            status = 200;
        } catch (e) {
            suffixMIME = 'text/plain';
        }
        res.writeHead(status, {'content-type': suffixMIME + ';charset=utf-8;'});
        res.end(conFile);
    }


});
server1.listen(80, function () {
    console.log('server is success,listening on 80 port!');
});