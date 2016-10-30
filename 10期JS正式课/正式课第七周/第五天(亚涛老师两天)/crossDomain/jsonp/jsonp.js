/**
 * Created by zhufengpeixun on 2016/10/30.
 */
(function () {
    /**
     * jsonp
     * @param {string} url jsonp接口地址
     * @param {*} data 往服务器发送的参数
     * @param {string} jsonpcallback jsonpcallback
     * @param {Function} callback 回调函数
     */
    function jsonp(url, data, jsonpcallback, callback) {
        // 生成全局函数名
        var cbName = 'cb' + counter++;
        // 把data格式化为querystring拼接url后
        url = appendToURL(url, data);
        // 拼接jsonpcallback和全局函数名
        url = appendToURL(url, jsonpcallback + '=' + cbName);

        // 定义全局函数体
        window[cbName] = function (data) {
            try {
                callback(data);
            } finally {
                complete();
            }


        };
        // 动态生成script标签
        var script = document.createElement('script');
        script.src = url;

        /**
         * 当请求成功之后，删除script标签，删除之前定义的全局函数
         */
        function complete() {
            script.parentNode.removeChild(script);
            delete window[cbName];
        }

        // 为了防止dom树还未加载完成
        if (document.readyState !== 'loading') {
            document.body.appendChild(script);
        } else {
            if (window.addEventListener) {
                window.addEventListener('load', function () {
                    document.body.appendChild(script);
                }, false);
            } else {
                window.attachEvent('onload', function () {
                    document.body.appendChild(script);
                });
            }
        }


    }

    function param(data) {
        if (typeof data === 'string') {
            return data;
        }
        if (data === null || data === void 0) {
            return '';
        }
        if (Object.prototype.toString.call(data) === '[object Object]') {
            var arr = [];
            for (var name in data) {
                if (!data.hasOwnProperty(name)) continue;
                arr.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
            }
            return arr.join('&');
        }
        return data.toString();
    }

    function appendToURL(url, data) {
        data = param(data);
        if (!data) {
            return url;
        }
        var hasSearch = /\?/.test(url);
        return url + (hasSearch ? '&' : '?') + data;


    }

    var counter = 1;

    this.jsonp = jsonp;
}());