/**
 * Created by zhufengpeixun on 2016/10/30.
 */
var http = require('http');
var fs = require('fs');
var url = require('url');
var querystring = require('querystring');
var path = require('path');
var bottleList = [];

var rootPath = path.resolve('../ajax/bottle/');
var server = http.createServer((request, response)=> {
    var urls = url.parse(request.url, true);
    var requestPath = urls.pathname;
    var method = request.method;

    //http://localhost:8080/helloWorld?id=adhfjhasdf
    if (requestPath === '/helloWorld') {
        var id = urls.query.id;
        if (!id) {
            id = 'obama'
        }
        //response.end('var ' + id + '="hello world by node.js";');
        response.end(id + '("hello world by node.js");');
        // show("sadgfjahsdgfkjhasdf")
    } else if (requestPath === '/cors') {
        response.writeHead(200, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true
            //'Access-Control-Allow-Origin': '*'
        });
        response.end('hello cors');
    } else if (requestPath === '/throwBottle') {
        var data = '';
        request.on('data', function (chunk) {
            data += chunk;
        });
        request.on('end', function () {
            try {
                data = JSON.parse(data);
                bottleList.push(data);
                response.end('success');
            } catch (ex) {
                response.writeHead(500);
                response.end('server internal error');
            }


        });
    } else if (requestPath === '/getBottle') {
        var index = Math.round(Math.random() * bottleList.length);
        var item = bottleList[index];
        response.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
        response.end(JSON.stringify(item));
    } else {
        var filePath = path.join(rootPath, requestPath);
        var fileExists = fs.existsSync(filePath);
        if (fileExists) {
            var file = fs.readFileSync(filePath);
            response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            response.end(file);
        } else {
            response.writeHead(404, 'Not Found');
            response.end('no such file or dir');
        }
    }
});

server.listen(8080, function () {
    console.log('server start')
});