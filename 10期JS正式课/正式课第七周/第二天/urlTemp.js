var url = require('url');
var str = 'http://172.18.1.208:80/css/index.css?name=zxt&age=26#aa';
var result = url.parse(str);
/*console.log(result);*/
/*
 Url {
 protocol: 'http:',  传输协议
 slashes: true, 是否有斜线
 auth: null, 作者
 host: '172.18.1.208:80',  域名/IP+端口
 port: '80',  端口号
 hostname: '172.18.1.208',  域名/IP
 hash: '#aa', HASH值
 search: '?name=zxt&age=26', 问号传参(包含问号)
 query: 'name=zxt&age=26',  问号传参(不包含问号)
 pathname: '/css/index.css', 请求资源文件的路径和名称
 path: '/css/index.css?name=zxt&age=26',
 href: 'http://172.18.1.208:80/css/index.css?name=zxt&age=26#aa' }
 */

result = url.parse(str, true);
console.log(result);
/*
 Url {
 query: { name: 'zxt', age: '26' },  第二个参数为TRUE,会把传递进来的问号后的参数值以对象键值对的形式进行存储,默认第二个参数是FALSE,存储的方式是字符串
 }
 */