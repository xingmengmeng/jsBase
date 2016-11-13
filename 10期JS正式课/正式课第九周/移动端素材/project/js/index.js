/*--String.prototype--*/
~function (pro) {
    function queryURLParameter() {
        var reg = /([^?=&#]+)=([^?=&#]+)/g,
            obj = {};
        this.replace(reg, function () {
            obj[arguments[1]] = arguments[2];
        });

        reg = /#([^?=&#]+)/;
        if (reg.test(this)) {
            obj['HASH'] = reg.exec(this)[1];
        }
        return obj;
    }

    function formatTime(template) {
        template = template || '{0}年{1}月{2}日 {3}时{4}分{5}秒';
        var ary = this.match(/\d+/g);
        template = template.replace(/\{(\d+)\}/g, function () {
            var n = arguments[1],
                res = ary[n] || '00';
            res.length < 2 ? res = '0' + res : null;
            return res;
        });
        return template;
    }

    pro.queryURLParameter = queryURLParameter;
    pro.formatTime = formatTime;
}(String.prototype);


/*--HEADER RENDER--*/
var headerRender = (function () {
    var $header = $('#header'),
        $menu = $header.children('.menu'),
        $nav = $('#nav');
    var isFlag = false;//->默认开始的时候是隐藏的

    return {
        init: function () {
            $menu.tap(function () {
                //->当前是隐藏的我们展开
                if (isFlag === false) {
                    isFlag = true;
                    $nav.css({
                        padding: '.1rem 0',
                        height: '2.22rem'
                    });
                    return;
                }
                //->当前是展开的我们隐藏
                isFlag = false;
                $nav.css({
                    padding: '0',
                    height: '0'
                });
            });
        }
    }
})();
headerRender.init();

/*--MATCH RENDER--*/
var matchRender = (function () {
    var $matchInfo = $('#matchInfo'),
        $matchTemplate = $('#matchTemplate'),
        $progress = null;

    var isTouch = false;//->记录是否点击过

    //->BIND SUPPORT
    function bindSupport(matchInfo) {
        var $support = $matchInfo.find('.support'),
            $supportLeft = $support.eq(0),
            $supportRight = $support.eq(1);

        //->首先获取本地是否存储SUPPORT信息,存储了我们就不在让它点击了
        var supportStorage = localStorage.getItem('support');
        if (supportStorage) {
            supportStorage = JSON.parse(supportStorage);
            var lx = supportStorage.supportType;
            lx == 1 ? $supportLeft.addClass('bg') : $supportRight.addClass('bg');
            return;
        }

        $support.tap(function () {
            if (isTouch) return;

            //->点击谁选中谁,并且让里面的数字加1
            isTouch = true;
            $(this).addClass('bg').html(parseFloat($(this).html()) + 1);

            //->重新计算进度条的值
            $progress.css('width', ($supportLeft.html() / (parseFloat($supportLeft.html()) + parseFloat($supportRight.html()))) * 100 + '%');

            //->告诉服务器我支持的是谁,传递TYPE=1支持左边,传递TYPE=2支持右边
            $.ajax({
                url: 'http://matchweb.sports.qq.com/kbs/teamSupport?mid=100000:1468531&type=' + $(this).attr('lx'),
                type: 'get',
                dataType: 'jsonp'
            });

            //->把本次支持的信息记录到本地,下一次控制不能在支持了
            //localStorage.setItem设置值的时候只能是字符串
            localStorage.setItem('support', JSON.stringify({
                isTouch: true,
                supportType: $(this).attr('lx')
            }));
        });
    }

    //->USE EJS TO BIND HTML DATA
    function bindHTML(matchInfo) {
        $matchInfo.html(ejs.render($matchTemplate.html(), {matchInfo: matchInfo}));

        //->COMPUTED PROGRESS
        $progress = $matchInfo.find('.progress');
        $progress.css('width', (matchInfo.leftSupport / (parseFloat(matchInfo.leftSupport) + parseFloat(matchInfo.rightSupport))) * 100 + '%');
    }

    return {
        init: function () {
            //->JSONP GET DATA
            $.ajax({
                url: 'http://matchweb.sports.qq.com/html/matchDetail?mid=100000:1468531',
                type: 'get',
                dataType: 'jsonp',
                success: function (result) {
                    //->FORMAT RESULT
                    var data = result[1];
                    if (!data) return;
                    var matchInfo = data.matchInfo;
                    matchInfo.rightSupport = data.rightSupport;
                    matchInfo.leftSupport = data.leftSupport;

                    //->BIND HTML
                    bindHTML(matchInfo);

                    //->BIND SUPPORT
                    bindSupport(matchInfo);
                }
            });
        }
    }
})();
matchRender.init();

/*--MATCH LIST RENDER--*/
var matchListRender = (function () {
    var $matchList = $('#matchList'),
        $matchListTemplate = $('#matchListTemplate'),
        $wrapper = $matchList.children('.wrapper');

    //->BIND HTML
    function bindHTML(result) {
        $wrapper.html(ejs.render($matchListTemplate.html(), {result: result})).css('width', result.length * 2.4 + 0.3 + 'rem');

        //->ISCROLL
        new IScroll('#matchList', {
            scrollX: true,
            scrollY: false
        });
    }

    return {
        init: function () {
            $.ajax({
                url: 'http://matchweb.sports.qq.com/html/matchStatV37?mid=100002:2365',
                type: 'get',
                dataType: 'jsonp',
                success: function (result) {
                    //->FORMAT DATA
                    var data = result[1];
                    if (!data) return;
                    var stats = data.stats;
                    $.each(stats, function (index, item) {
                        if (item.type == 9) {//->视频集锦
                            result = item.list;
                            return false;
                        }
                    });

                    //->BIND HTML
                    bindHTML(result);
                }
            });
        }
    }
})();
matchListRender.init();