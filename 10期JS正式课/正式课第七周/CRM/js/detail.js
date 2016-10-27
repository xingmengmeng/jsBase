//"http://localhost/detail.html?id=12&name=zf&age=8" =>{id:12,name:'zf',age:8} 文章:http://old.zhufengpeixun.cn/qianduanjishuziliao/javaScriptzhuanti/2016-07-02/482.html
~function (pro) {
    //->获取URL地址中问号传递过来的参数值,以对象键值对的方式存储
    function queryURLParameter() {
        var reg = /([^?&=#]+)=([^?&=#]+)/g,
            obj = {};
        this.replace(reg, function () {
            obj[arguments[1]] = arguments[2];//=>obj['id']=12
        });
        return obj;
    }

    pro.queryURLParameter = queryURLParameter;
}(String.prototype);


var detailRender = (function () {
    var userName = document.getElementById('userName'),
        userAge = document.getElementById('userAge'),
        userPhone = document.getElementById('userPhone'),
        userAddress = document.getElementById('userAddress'),
        submit = document.getElementById('submit');

    var customId = null,
        isFlag = false;//->是否是修改,TRUE就是修改

    //->bindEvent:给提交按钮的点击事件绑定的方法
    function bindEvent() {
        var obj = {
            name: userName.value,
            age: userAge.value,
            phone: userPhone.value,
            address: userAddress.value
        };
        if (isFlag) {
            //->修改
            //->在OBJ的基础上增加一个ID
            obj.id = customId;
            //->按照API文档把内容发送给服务器,修改成功在跳转回到首页
            ajax({
                url: '/updateInfo',
                type: 'post',
                dataType: 'json',
                data: JSON.stringify(obj),
                success: function (res) {
                    if (res && res.code == 0) {
                        window.location.href = 'index.html';
                    }
                }
            });
            return;
        }
        //->增加
        ajax({
            url: '/addInfo',
            type: 'post',
            dataType: 'json',
            data: JSON.stringify(obj),
            success: function (result) {
                if (result && result.code == 0) {
                    window.location.href = 'index.html';
                }
            }
        });
    }

    return {
        init: function () {
            //->获取URL地址栏传递过来的参数ID的值
            var urlObj = window.location.href.queryURLParameter();
            customId = urlObj['id'];
            if (typeof customId !== 'undefined') {
                isFlag = true;
                //->把CUSTOM ID对应的客户信息获取到,然后放到四个文本框中
                ajax({
                    url: '/getInfo?id=' + customId,
                    type: 'get',
                    dataType: 'json',
                    success: function (result) {
                        if (result && result.code == 0) {
                            var data = result.data;
                            userName.value = data.name;
                            userAge.value = data.age;
                            userPhone.value = data.phone;
                            userAddress.value = data.address;
                            submit.innerHTML = '修改';
                        }
                    }
                });
            }

            //->点击提交按钮实现修改或者增加
            submit.onclick = bindEvent;
        }
    }
})();
detailRender.init();