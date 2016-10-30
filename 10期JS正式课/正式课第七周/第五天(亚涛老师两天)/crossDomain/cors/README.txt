跨域资源共享
缩写为cors （cross origin resource sharing）

利用浏览器提供的API来实现的跨域

ie6、7不支持此功能


标准浏览器
XMLHttpRequest
ie8-ie9
XDomainRequest


withCredentials 凭据 凭证 证据
该属性默认为false 不需要跨域携带cookie
如果该属性为true 则跨域请求时自动携带上cookie

服务器必须要设置
Access-Control-Allow-Origin

如果需要跨域携带cookie
Access-Control-Allow-Credentials:true
同时Access-Control-Allow-Origin不能设置为*，只能设置为指定origin

jsonp和cors的区别：
相同点：
1、都是用来处理跨域的
2、都需要server端进行强配合

不同点：
1、jsonp利用script实现的跨域请求，而cors则是利用浏览器提供的API来实现的
2、jsonp只能是get方法、cors则post、head、put、get、delete都可以使用
3、jsonp没有浏览器兼容性，cors则是ie8+才可用

