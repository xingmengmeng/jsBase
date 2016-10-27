var detailRender = (function () {
    var userName = document.getElementById('userName'),
        userAge = document.getElementById('userAge'),
        userPhone = document.getElementById('userPhone'),
        userAddress = document.getElementById('userAddress'),
        submit = document.getElementById('submit');

    //->bindEvent:给提交按钮的点击事件绑定的方法
    function bindEvent() {
        //->获取四个文本框中的内容,并且把内容转换为JSON格式的字符串
        var obj = {
            name: userName.value,
            age: userAge.value,
            phone: userPhone.value,
            address: userAddress.value
        };
        var data = JSON.stringify(obj);//->JSON.stringify:把一个对象转换为JSON格式的字符串(IE6~7不兼容,如何处理兼容?)

        //->发送AJAX请求传递给服务器,接收服务器返回的结果:成功的话跳转回首页,失败的话在页面提示一个ALERT弹框
        ajax({
            url: '/addInfo',
            type: 'post',
            dataType: 'json',
            data: data,
            success: function (result) {
                if (result && result.code == 0) {
                    window.location.href = 'index.html';//->window.location.href:JS中实现页面的跳转
                }
            }
        });
    }

    return {
        init: function () {
            submit.onclick = bindEvent;
        }
    }
})();
detailRender.init();