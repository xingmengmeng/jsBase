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
    if (/^(GET|HEAD|DELETE)$/i.test(_default.type) && _default.cache === false) {
        var symbol = _default.url.indexOf('?') === -1 ? '?' : '&';
        _default.url += symbol + '_=' + Math.random();
    }
    xhr.open(_default.type, _default.url, _default.async);
    xhr.onreadystatechange = function () {
        if (/^(2|3)\d{2}$/.test(xhr.status)) {
            if (xhr.readyState === 4) {
                var text = xhr.responseText;
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