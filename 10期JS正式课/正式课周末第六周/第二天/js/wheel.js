/**
 * Created by 39753 on 2016/10/23.
 */
function addWheel(ele,fn){//在ele元素上滑动鼠标滚轮的时候，想干什么事？
    function wheel(e){//判断滚轮方向
        e=e||window.event;
        var bOk=false;
        if(e.wheelDelta){
            bOk= e.wheelDelta<0?true:false;
        }else{
            bOk= e.detail>0?true:false;
        }
        fn && fn.call(ele,bOk);
        e.preventDefault? e.preventDefault(): e.returnValue=false;
    }
    //1.处理滚轮事件的兼容性：
    if(window.navigator.userAgent.toLowerCase().indexOf('firefox') !==-1){
        ele.addEventListener('DOMMouseScroll',wheel,false);
    }else{
        ele.onmousewheel=wheel;
    }
}