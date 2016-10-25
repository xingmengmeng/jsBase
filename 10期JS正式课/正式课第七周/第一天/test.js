var a = 12;
var b = 13;
var c = a;
a = b;
b = c;
console.log(a, b);

/*使用安装的LESS模块*/
var aa = require('less');
aa.render();