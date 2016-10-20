/**
 * Created by 39753 on 2016/10/20.
 */
//必会
function addWheel(ele,fn){
    function wheel(e){
        e=e||window.event;
        var bOk=null;
        //2.判断滚轮方向；IE和chrome：e.wheelDelta ; 火狐：e.detail;
        if(e.wheelDelta){//IE和chrome
            bOk= e.wheelDelta<0?true:false;
        }else{
            bOk= e.detail>0?true:false;
        }
        fn && fn.call(ele,bOk);
        //阻止滚动条的默认事件
        e.preventDefault? e.preventDefault(): e.returnValue=false;
    }
    //1.判断是否有火狐浏览器：DOMMouseScroll; IE和chrome：onmousewheel
    if(window.navigator.userAgent.toLowerCase().indexOf('firefox') !==-1){
        ele.addEventListener('DOMMouseScroll',wheel,false);
    }else{
        ele.onmousewheel=wheel;
    }
}