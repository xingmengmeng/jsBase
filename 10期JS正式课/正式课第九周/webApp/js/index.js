/*--NAV RENDER--*/
var navRender = (function () {
    var $menu = $('#menu'),
        $nav = $('#nav');
    var isBok = false;
    return {
        init: function () {
            $menu.tap(function () {
                if (isBok) {
                    $nav.css({
                        padding: '0',
                        height: 0
                    });
                    isBok = false;
                    return;
                }
                $nav.css({
                    padding: '.1rem 0',
                    height: '2.22rem'
                });
                isBok = true;
            });
        }
    }
})();
navRender.init();