/*--String.prototype--*/
~function (pro) {
    //->queryURLParameter:get url parameter or hash
    function queryURLParameter() {
        var reg = /([^?=&#]+)=([^?=&#]+)/g,
            obj = {};
        this.replace(reg, function () {
            obj[arguments[1]] = arguments[2];
        });

        //->HASH
        reg = /#([^?=&#]+)/g;
        this.replace(reg, function () {
            obj['HASH'] = arguments[1];
        });
        return obj;
    }

    //->formatTime:format time by template
    function formatTime(template) {
        template = template || '{0}年{1}月{2}日 {3}时{4}分{5}秒';
        var reg = /\d+/g,
            ary = this.match(reg);
        template = template.replace(/\{(\d+)\}/g, function () {
            var index = arguments[1],
                res = ary[index] || '00';
            res.length < 2 ? res = '0' + res : null;
            return res;
        });
        return template;
    }

    pro.formatTime = formatTime;
    pro.queryURLParameter = queryURLParameter;
}(String.prototype);


/*--computed content height--*/
~function () {
    var $content = $('#content'),
        $header = $('#header'),
        $menu = $content.children('.menu');

    function fn() {
        var winH = document.documentElement.clientHeight || document.body.clientHeight;
        var tarH = winH - $header[0].offsetHeight - 40;
        $content.css('height', tarH);
        $menu.css('height', tarH - 2);
    }

    fn();
    $(window).on('resize', fn);
}();

/*MENU*/
var menuRender = (function () {
    var menuIScroll = null,
        $menu = $('#menu'),
        $menuLink = $menu.find('a');
    var $menuPlain = $.Callbacks();

    //->ISCROLL
    $menuPlain.add(function () {
        menuIScroll = new IScroll('.menu', {
            mouseWheel: true,
            scrollbars: true,
            fadeScrollbars: true,
            bounce: false
        });
    });

    //->POSITION
    $menuPlain.add(function () {
        //->获取URL中的HASH值,定位到具体的某一个元素的位置
        var hash = window.location.href.queryURLParameter()['HASH'] || 'nba',
            $cur = $menuLink.filter("[href='#" + hash + "']");
        $cur.length === 0 ? $cur = $menuLink.eq(0) : null;
        $cur.addClass('bg');

        //->定位完成后需要让其滚动到具体的位置:menuIScroll.scrollToElement([element], [speed])
        menuIScroll.scrollToElement($cur[0], 0);

        //->让右侧的日期区域跟着改变
        calendarRender.init($cur.attr('data-id'));
    });

    //->BIND EVENT
    $menuPlain.add(function () {
        $menuLink.on('click', function () {
            $(this).addClass('bg').siblings().removeClass('bg');
            calendarRender.init($(this).attr('data-id'));
        });
    });

    return {
        init: function () {
            $menuPlain.fire();
        }
    }
})();

/*--CALENDAR--*/
var calendarRender = (function () {
    var $calendar = $('#calendar'),
        $item = $calendar.find('.item');

    var $calendarPlain = $.Callbacks();

    //->BIND HTML
    $calendarPlain.add(function (today, data, columnId) {
        //->get template content
        var template = $('#calendarTemplate').html();

        //->ready data:data i want

        //->ejs render
        var res = ejs.render(template, {calData: data});

        //->insert html page
        $item.html(res);
    });

    //->POSITION
    $calendarPlain.add(function (today, data, columnId) {
        //->在所有的A中把当前日期这一项找到(如果找不到,找距离当前日期靠后的那一项,如果后面没有的话,选中最后一项)

        //->让找到的在七个展示中的中间位置(当然如果已经到达边界的话,以边界值为准)

        //->知道选中的日期了,给比赛列表区域绑定数据
        //matchRender.init(columnId, startTime, endTime);
    });

    $calendarPlain.add(function (today, data, columnId) {
        //->左右切换一切切七个(快速切换位置不均匀的问题)

        //->切换完成后,还需要重新的绑定下面比赛区域的数据
        //matchRender.init(columnId, startTime, endTime);
    });

    $calendarPlain.add(function (today, data, columnId) {
        //点击每一个日期，让比赛区域滚动到具体的位置
    });

    return {
        init: function (columnId) {
            //->columnId:match type id,default nba
            columnId = columnId || 100000;

            //->send jsonp get data
            $.ajax({
                url: 'http://matchweb.sports.qq.com/kbs/calendar?columnId=' + columnId,
                type: 'get',
                dataType: 'jsonp',
                success: function (result) {
                    //->format data
                    if (result && result.code == 0) {
                        result = result['data'];
                        var today = result['today'],
                            data = result['data'];
                        $calendarPlain.fire(today, data, columnId);
                    }
                }
            });
        }
    }
})();

/*--MATCH--*/
var matchRender = (function () {
    return {
        init: function (columnId, startTime, endTime) {
            //->http://matchweb.sports.qq.com/kbs/list?columnId=100000&startTime=2016-11-07&endTime=2016-11-13
        }
    }
})();


menuRender.init();