var http = require('http');//->导入内置的HTTP模块
var url = require('url');//->导入内置的URL模块,使用它中的PARSE方法实现URL地址各部分的解析

//->创建一个服务,叫做SERVER1  HTTP.CREATESERVE([CALL BACK]); 回调函数并不是在创建服务成功后就执行了,而需要客户端向服务端的这个服务(80端口这个服务)发送请求的时候,回调函数才会被触发执行。客户端请求一次就会被触发执行一次,不仅仅被执行,而且还默认传递了两个参数值:
//->REQUEST:存储了客户端传递过来的所有信息 REQ
//->RESPONSE:提供了很多的方法可以让服务器端把内容返回给客户端 RES
var server1 = http.createServer(function (request, response) {
    //->接收客户端的请求
    //->REQUEST.URL:存储的就是客户端请求资源文件的目录名称以及问号后面传递过来的参数值 例如:'/index.html'、'/css/index.css'、'/css/index.css?name=zxt&age=26'...
    var urlObj = url.parse(request.url, true),
        pathname = urlObj.pathname,
        query = urlObj.query;

    //->把请求的资源文件中的源代码获取到
    //->把获取的源代码返回给客户端
});

//->给创建的服务监听一个端口号  SERVER1.LISTEN([PORT 0-65535],[CALL BACK]) 当端口号监听成功后就会触发我们的回调函数执行
server1.listen(80, function () {
    console.log('server is success,listening on 80 port!');
});

/*
 * 如何向当前的服务发送请求?
 *   ->服务在自己电脑上,我们打开电脑的浏览器,输入: http://localhost:80/
 *   ->http://本机的内网IP:端口号/
 */










