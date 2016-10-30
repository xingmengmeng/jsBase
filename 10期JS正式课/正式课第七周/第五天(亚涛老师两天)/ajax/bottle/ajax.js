/**
 * Created by zhufengpeixun on 2016/10/29.
 */
//{
//    url: '',ajax请求地址
//    method: 'get',http方法
//    headers: {},自定义请求首部
//    async: true,是否为异步请求
//        data: {},往服务器发送的参数
//    success: function () { 成功时执行的回调函数
//    },
//    error: function () { 失败时执行的回调函数
//    },
//    cache: false 是否缓存
//    dataType:'json' 格式化服务器返回的数据类型
//}
(function (undefined) {
    /**
     * ajax核心逻辑
     * @param {Object} options 用户配置参数
     */
    function ajax(options) {
        // 判断参数是否为一个对象
        if (!tools.isType(options, 'Object')) {
            throw new TypeError('参数类型错误');
        }
        // 获取ajax对象
        var xhr = tools.getXHR();

        // 设置http方法默认值
        options.method || (options.method = 'get');
        options.url || (options.url = '/');
        // 因为undefined在低版本ie存在一个bug，可以被重写的bug
        // 所以这里不直接判断是否等于undefined 而是判断void表达式
        //options.async === void 0 && (options.async = true);
        options.async !== void 0 || (options.async = true);

        var url = options.url;
        // 将data格式化为querystring格式
        var data = tools.param(options.data);

        var isLikeGet = /^get|delete|head$/ig.test(options.method);
        // 将querystring格式的data拼接到url后面
        // 1、get系方法 将data格式化为querystring拼接到url后
        // 如果是get系 则将data设置为空
        if (isLikeGet && data) {
            url = tools.appendToURL(url, data);
            data = null;
        }

        // 2、如果cache为false 需要往url后面添加随机数
        if (isLikeGet && options.cache === false) {
            var ran = (Math.random()).toString(36).slice(2);
            url = tools.appendToURL(url, '_=' + ran);
        }


        // 执行open方法
        xhr.open(options.method, url, options.async);

        // 设置自定义请求首部
        if (xhr.setRequestHeader && options.headers) {
            for (var header in options.headers) {
                if (!options.headers.hasOwnProperty(header)) {
                    continue;
                }
                xhr.setRequestHeader(header, options.headers[header]);
            }
        }

        // step 3 接收服务器响应
        xhr.onreadystatechange = function () {
            // 判断http事务是否完成
            if (xhr.readyState === 4) {
                // 获取http响应主体
                var response = xhr.responseText;
                // 判断状态码是否成功
                if (/^2\d{2}$/.test(xhr.status) || xhr.status === 304) {
                    // 判断是否需要将响应主体格式化json对象
                    if (options.dataType === 'json') {
                        // 因为response不是合法的json字符串的话，执行JSONParse会报错。所以这里用try catch包住
                        try {
                            response = tools.JSONParse(response);
                        } catch (ex) {
                            options.error && options.error(ex);
                            return;
                        }
                    }
                    options.success && options.success(response);

                } else if (/^(4|5)\d{2}$/.test(xhr.status)) {
                    options.error && options.error(new Error('服务器出错'));
                }
            }
        };

        // step 4 发送请求
        xhr.send(data);
    }

    var tools = {
        /**
         * 判断数据类型
         * @param {*} data 需要判断类型的数据
         * @param {string} type 数据格式
         * @return {boolean} 数据格式是否匹配
         */
        isType: function (data, type) {
            return Object.prototype.toString.call(data) === '[object ' + type + ']';
        },
        /**
         * 利用惰性函数获取ajax对象
         */
        getXHR: (function () {
            var XHRList = [function () {
                return new XMLHttpRequest();
            }, function () {
                return new ActiveXObject('Microsoft.XMLHTTP');
            }, function () {
                return new ActiveXObject('Msxml2.XMLHTTP');
            }, function () {
                return new ActiveXObject('Msxml3.XMLHTTP');
            }];

            var xhr = null;
            while (xhr = XHRList.shift()) {
                try {
                    xhr();
                    return xhr;
                } catch (ex) {

                }
            }
            throw new ReferenceError('当前浏览器不支持ajax功能');
        })(),
        /**
         * 将对象格式化为querystring格式
         * @see {a:1,b:2} => a=1&b=2
         * @param data
         */
        param: function (data) {
            // 因为该方法的目的就是返回一个字符串，参数已经是一个字符串则直接返回
            if (typeof data === 'string') {
                return data;
            }
            // 如果参数为null或者undefined 返回空字符串
            if (data === null || data === undefined) {
                return '';
            }
            // 如果data是一个对象
            if (tools.isType(data, 'Object')) {
                var arr = [];
                for (var key in data) {
                    if (!data.hasOwnProperty(key)) continue;
                    // 因为url中不能存在非英文字符
                    // encodeURI
                    arr.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
                }
                return arr.join('&');
            }

            // 参数既不是string 也不是对象、null、undefined 则直接toString返回
            return data.toString();
        },
        /**
         * 往url后面拼接字符串
         */
        appendToURL: function (url, str) {
            // 先调用param方法，格式化下str
            str = this.param(str);
            if (!str) {
                return url;
            }
            // 判断url中是否存在问号
            var hasQuery = /\?/.test(url);
            return url + (hasQuery ? '&' : '?') + str;
        },
        /**
         * 将json字符串格式化为json对象
         * @param {string} JSONString json字符串
         * @return {Object} 转化后的json对象
         */
        JSONParse: function (JSONString) {
            if (window.JSON) {
                return JSON.parse(JSONString)
            }
            //(new Function('return '+json))();
            // __proto__
            return eval('(' + JSONString + ')');
        }
    };

    this.ajax = ajax;
}());