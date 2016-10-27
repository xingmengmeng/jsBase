function ajax(type, url, async, data, error, dataType, success, cache) {
    var xhr = new XMLHttpRequest;
    if (cache === false) {
        //->在URL的末尾加随机数
    }
    xhr.open(type, url, async);
    xhr.onreadystatechange = function () {
        if (/^(2|3)\d{2}$/.test(xhr.status)) {
            if (xhr.readyState === 4) {
                var text = xhr.responseText;
                if (dataType === 'json') {
                    text = 'JSON' in window ? JSON.parse(text) : eval('(' + text + ')');
                }
                success && success.call(xhr, text);
            }
            return;
        }
        //->请求失败,执行ERROR这个回调函数,并且让回调函数中的THIS变为实例XHR,以后在会调函数中我们可以操作XHR这个对象了;而且我们还给回调函数传递一个参数值:响应主体内容,在出现错误的情况下,响应主体中存储的是出问题的原因;
        //typeof error === 'function' ? error() : null;
        error && error.call(xhr, xhr.responseText);
    };
    xhr.send(data);
}

/*
 ajax(function (result) {
 this - > xhr

 });*/
