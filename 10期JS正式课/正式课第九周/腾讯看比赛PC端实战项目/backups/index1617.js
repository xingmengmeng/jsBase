/*计算CON区域的高度*/
~function () {
    var $content = $('#content'),
        $header = $('#header'),
        $menu = $content.children('.menu');
    //->children:在当前容器的所有子元素中进行筛查  find:在当前容器的所有后代元素(子子孙孙,无穷尽也)中进行筛查  filter:首先通过JQ选择器获取一个类数组集合,在这个集合中在通过某个条件进行二次筛选

    function fn() {
        var winH = document.documentElement.clientHeight || document.body.clientHeight;
        var tarH = winH - $header[0].offsetHeight - 40;//->$header[0]:把JQ对象转换为原声的JS对象  $header.get(0):和第一种写法是一模一样的  $header.eq(0):在现有的JQ集合中,选出索引为0这一项,但是获取的结果依然还是JQ对象 =>JQ对象其实就是JQ这个类的一个实例,也是一个类数组集合
        $content.css('height', tarH);
        $menu.css('height', tarH - 2);
    }

    fn();
    $(window).on('resize', fn);
}();


/*MENU*/
var menuRender = (function () {
    var menuIScroll = null;

    return {
        init: function () {
            menuIScroll = new IScroll('.menu', {
                mouseWheel: true,//->开启鼠标滚轮滚动控制模式
                scrollbars: true, //->显示滚动条
                fadeScrollbars: true, //->开启滚动条操作的时候显示,不操作的时候隐藏的功能
                bounce: false //->禁止到边界的反弹
            });

        }
    }
})();
menuRender.init();