var customerRender = (function () {
    var customList = document.getElementById('customList');

    //->bindHTML:数据绑定
    function bindHTML(data) {
        var str = '';
        for (var i = 0; i < data.length; i++) {
            var cur = data[i];
            str += '<li>';
            str += '<span class="w50">' + cur.id + '</span>';
            str += '<span class="w150">' + cur.name + '</span>';
            str += '<span class="w50">' + cur.age + '</span>';
            str += '<span class="w200">' + cur.phone + '</span>';
            str += '<span class="w200">' + cur.address + '</span>';
            str += '<span class="w150 control">';
            str += '<a href="detail.html?id=' + cur.id + '">修改</a>';
            /*不仅仅要跳转到详情页,而且需要把当前用户的ID传递过去(问号传参?id=xxx),这样的话我们在详情页就可以区分是增加还是修改,而且还知道了要修改的是谁*/
            str += '<a href="javascript:;" data-id="' + cur.id + '">删除</a>';
            /*为了方便后期删除的时候获取对应的客户ID,我们把客户的ID存储到每一个A的自定义属性上,这样以后在需要使用的时候,直接从自定义属性获取即可*/
            str += '</span>';
            str += '</li>';
        }
        customList.innerHTML = str;
    }

    //->bindEvent:使用事件委托实现删除操作
    function bindEvent() {
        customList.onclick = function (e) {
            e = e || window.event;
            var tar = e.target || e.srcElement,
                tarTag = tar.tagName.toUpperCase();
            if (tarTag === 'A' && tar.innerHTML === '删除') {
                //->获取对应的ID
                var customId = tar.getAttribute('data-id');

                //->在删除前先给提示
                var flag = window.confirm('确定要删除编号为 [ ' + customId + ' ] 的客户吗?');
                if (flag === false) return;//->点击的是取消

                //->发送AJAX请求
                ajax({
                    url: '/removeInfo?id=' + customId,
                    type: 'get',
                    dataType: 'json',
                    success: function (result) {
                        if (result && result.code == 0) {
                            customList.removeChild(tar.parentNode.parentNode);
                        }
                    }
                });
            }
        }
    }

    return {
        init: function () {
            ajax({
                url: '/getAllList',
                type: 'get',
                dataType: 'json',
                success: function (result) {
                    if (result && result.code == 0) {
                        var data = result.data;

                        //->绑定数据
                        bindHTML(data);

                        //->实现删除
                        bindEvent();
                    }
                }
            });
        }
    }
})();
customerRender.init();