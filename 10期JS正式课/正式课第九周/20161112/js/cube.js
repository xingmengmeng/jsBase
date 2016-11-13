/*--只要以后在页面中实现滑动,我们就把DOCUMENT的TOUCH MOVE的默认行为禁止掉,这样就可以避免个个浏览器自己滑动时候所产生的默认行为--*/
document.addEventListener('touchmove', function (e) {
    e.preventDefault();
}, false);

/*--魔方区域--*/
var cubeRender = (function () {
    var $cube = $('#cube'),
        $box = $cube.children('.box'),
        $imgList = $box.children('img');

    //->记录了最开始的时候盒子的旋转角度
    $box.attr({
        rotateX: 45,
        rotateY: 45
    });

    function start(e) {
        var point = e.changedTouches[0];
        $(this).attr({
            strX: point.pageX,
            strY: point.pageY,
            changeX: 0,
            changeY: 0
        });
    }

    function move(e) {
        var point = e.changedTouches[0],
            changeX = point.pageX - parseFloat($(this).attr('strX')),
            changeY = point.pageY - parseFloat($(this).attr('strY'));
        $(this).attr({
            changeX: changeX,
            changeY: changeY
        });
    }

    function end(e) {
        var changeX = parseFloat($(this).attr('changeX')),
            changeY = parseFloat($(this).attr('changeY'));
        var rotateX = parseFloat($(this).attr('rotateX')),
            rotateY = parseFloat($(this).attr('rotateY'));

        //->偏移的值大于10才算移动
        if (Math.abs(changeX) > 10) {
            //->X轴偏移的值是控制盒子沿着Y轴旋转的
            rotateY = rotateY + changeX / 3;
        }

        if (Math.abs(changeY) > 10) {
            //->Y轴偏移的值是控制盒子沿着X轴旋转的
            rotateX = rotateX - changeY / 3;
        }

        $(this).css('transform', 'scale(0.6) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)');
        $box.attr({
            rotateX: rotateX,
            rotateY: rotateY
        });
    }

    return {
        init: function () {
            //->bind cube event
            $box.on('touchstart', start).on('touchmove', move).on('touchend', end);

            //->bind img tap
            $imgList.tap(function () {

            });
        }
    }
})();
cubeRender.init();