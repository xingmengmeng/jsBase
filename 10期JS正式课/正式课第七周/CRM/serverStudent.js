var http = require('http'),
    url = require('url'),
    fs = require('fs');
var server = http.createServer(function (request, response) {
    var urlObj = url.parse(request.url, true),
        pathname = urlObj.pathname,
        query = urlObj.query;

    //->处理静态资源文件的请求
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
        }
        var conFile = 'NOT FOUND',
            status = 404;
        try {
            conFile = fs.readFileSync('.' + pathname, 'utf-8');
            status = 200;
        } catch (e) {
            suffixMIME = 'text/plain';
        }
        response.writeHead(status, {'content-type': suffixMIME + ';charset=utf-8;'});
        response.end(conFile);
        return;
    }

    //->处理客户端的AJAX请求(把API文档上提供的功能都实现了)

    //->首先获取文件中的所有客户信息,并且把获取的信息转换为JSON格式的对象
    var customData = fs.readFileSync('./json/custom.json', 'utf-8');
    customData.length === 0 ? customData = '[]' : null;//->防止文件中什么都没有,我们获取的空字符串在接受JSON.PARSE方法转换的时候会报错,我们把空字符串变成'[]'
    customData = JSON.parse(customData);

    //->初始定义返回的结果变量
    var result = {
        code: 1,
        msg: 'ERROR',
        data: null
    };

    //->获取所有的客户信息
    if (pathname === '/getAllList') {
        if (customData.length > 0) {
            result = {
                code: 0,
                msg: 'SUCCESS',
                data: customData
            };
        }
        response.writeHead(200, {'content-type': 'application/json;charset=utf-8;'});
        response.end(JSON.stringify(result));
        return;
    }

    //->获取指定客户的信息
    if (pathname === '/getInfo') {
        //->把客户端传递进来的ID获取到,ID从QUERY中存储着呢
        var customId = query['id'];
        //->在所有的客户信息中遍历,ID和传递进来的ID相同的那一项,获取到那一项之后，把信息返回给客户端即可
        customData.forEach(function (item, index) {
            if (customId == item['id']) {
                result = {
                    code: 0,
                    msg: 'SUCCESS',
                    data: item
                };
                return false;//->结束FOREACH循环
            }
        });
        response.writeHead(200, {'content-type': 'application/json;charset=utf-8'});
        response.end(JSON.stringify(result));
        return;
    }

    //->增加客户信息:把客户端传递进来的用户输入的内容存储到CUSTOM.JSON文件中
    if (pathname === '/addInfo') {
        //->获取客户端传递的内容,由于客户端使用的是POST请求,我们需要获取请求主体中的内容(不是GET请求的问号传参了,所以不能使用QUERY获取了)
        var str = '';
        request.on('data', function (chunk) {//->正在一点点的接收客户端请求主体中的内容,每接收一点点就会触发依稀回调函数执行,CHUNK就是当前这一次接收的一小部分内容
            str += chunk;
        });
        request.on('end', function () {//->全部接收完了,该干啥干啥
            //->把获取的内容转换为JSON对象
            str = JSON.parse(str);
            //->根据当前所有客户信息中的最大编号给新增的信息加编号:最大的编号+1即可
            str['id'] = Number(customData[customData.length - 1]['id']) + 1;
            /*var max = customData[customData.length - 1]['id'];
             max += 1;
             str['id'] = max;*/
            //->把我们需要增加的放到CUSTOMDATA数组中,然后在把最新的数组放入到CUSTOMER.JSON中即可
            customData.push(str);
            fs.writeFileSync('./json/custom.json', JSON.stringify(customData), 'utf-8');
            //->返回客户端成功或者失败
            response.writeHead(200, {'content-type': 'application/json;charset=utf-8'});
            response.end(JSON.stringify({
                code: 0,
                msg: 'SUCCESS'
            }));
        });
    }
});
server.listen(88, function () {
    console.log('ok');
});