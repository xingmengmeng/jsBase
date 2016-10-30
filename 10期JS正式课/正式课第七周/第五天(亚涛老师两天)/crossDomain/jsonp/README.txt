跨域（请求）

同域请求：
一个请求的url中的方案、域名、端口和宿主页面url的方案、域名、端口一模一样，那么这个请求就叫做同域请求。
跨域请求：
一个请求中的方案、域名、端口和宿主页面url的方案、域名、端口有任何一个不一致，那么这个请求就叫做跨域请求。

origin=方案+域名+端口

同源（same origin）策略
它是一种浏览器厂商为了安全强制浏览器使用的安全限制。规定了javascript可以在哪些地方执行，哪些不能执行（跨域请求）。

只有同源的时候javascript运行才完全不受限制。

img 会把加载到的内容强制当成图片来限时。如果不是一个合法的图片就会显示一个裂图。

script 会把加载的内容强制当成javascript去运行。

jsonp：
返回的数据格式：function name （ json string）
json padding a functionName =》
json padding =>
jsonp

jsonp的特点：
1、通过script不受同源策略并且会把加载到的内容当成javascript去执行的特点来发起请求
2、在发起请求之前，先定一个全局函数,用来处理服务器返回的数据
3、通过querystring将全局函数名发送到服务器
4、server必须定义好querystring中的那个用来传递全局函数名称的key，这个key有一个专门的名称叫“jsonpcallback”，例子中的jsonpcallback是id
5、服务器根据请求url中querystring里的jsonpcallback（id）来获取全局函数名称
6、拼接字符串，全局函数名 + ( + 返回给浏览器的数据 + )
7、前端请求的script收到服务器的响应之后会立即执行。就会执行之前定义好的那个全局函数。

jsonp的特性：
浏览器中所有的href和src请求都是get方法的请求。
因为jsonp是通过script的src属性发起的请求，所以jsonp是get 方法请求。导致了get方法有的特点jsonp全有。
1、容易被缓存
2、有大小限制
3、没有请求主体
4、明文发送

