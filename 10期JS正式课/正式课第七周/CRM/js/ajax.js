function ajax(options) {
    //->init parameters
    var _default = {
        url: null,
        type: 'get',
        dataType: 'text',
        data: null,
        cache: true,
        async: true,
        success: null,
        error: null
    };
    for (var key in options) {
        if (options.hasOwnProperty(key)) {
            _default[key] = options[key]
        }
    }

    //->SEND AJAX
    var xhr = new XMLHttpRequest;
    //->如果当前是GET系列的请求,我们的CACHE也设置为FALSE,需要我们清除缓存：在原有的URL的末尾追加随机数即可(之前有问号我们用&符,之前没有才用?)
    if (/^(GET|HEAD|DELETE)$/i.test(_default.type) && _default.cache === false) {
        var symbol = _default.url.indexOf('?') === -1 ? '?' : '&';
        _default.url += symbol + '_=' + Math.random();
    }
    xhr.open(_default.type, _default.url, _default.async);
    xhr.onreadystatechange = function () {
        if (/^(2|3)\d{2}$/.test(xhr.status)) {
            if (xhr.readyState === 4) {
                var text = xhr.responseText;
                //->从服务器获取的是字符串,我们需要把它转换为我们需要的
                switch (_default.dataType) {
                    case 'json':
                        text = 'JSON' in window ? JSON.parse(text) : eval('(' + text + ')');
                        break;
                    case 'xml':
                        text = xhr.responseXML;
                        break;
                }
                _default.success && _default.success.call(xhr, text);
            }
            return;
        }
        if (xhr.readyState === 4) {
            _default.error && _default.error.call(xhr, xhr.responseText);
        }
    };
    xhr.send(_default.data);
}

/*ajax({
 url: '',//->Request URL
 type: '',//->HTTP METHOD  都是小写的:get(默认) post head put delete...
 dataType: '',//->获取的数据转换为什么样的类型(预设返回的数据类型),从服务器获取的一般都是字符串,我们可以把获取的字符串按照预定的方式进行转换 text(默认)、json、xml...
 data: '',//->如果是GET请求默认是null POST请求如果需要传递给服务器内容,我们把内容放到DATA中即可,一般都是JSON格式的字符串
 cache: false,//->默认是TRUE 如果是GET请求,我们设置了FALSE,不想走缓存,在URL的末尾加随机数
 async: true,//->默认是TRUE异步 FALSE同步
 success: function (result) {//->请求成功后做的事情

 },
 error: function (result) {//->请求失败后做的事情

 }
 });*/
