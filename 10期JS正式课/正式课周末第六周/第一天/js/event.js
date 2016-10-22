/**
 * Created by 39753 on 2016/10/22.
 */
//事件绑定-》标准浏览器+IE浏览器(this，顺序，重复绑定)，run方法，  解除绑定
function on(ele,type,fn){
    if(/^self/.test(type)){//自定义行为
        if(!ele[type]){
            ele[type]=[];
        }
        var a=ele[type];
        for(var i=0; i< a.length; i++){
            if(a[i]==fn) return;
        }
        a.push(fn);//把所有自定义行为下的方法，都放进数组中；
    }else{//系统行为；
        if(ele.addEventListener){//标准浏览器的事件绑定
            ele.addEventListener(type,fn,false);
        }else{//IE浏览器的事件绑定-attachEvent
            //把所有要绑定的方法，都放进自己事件池；
            if(!ele['aEvent'+type]){
                ele['aEvent'+type]=[];
                //只给系统事件池，绑定一个run方法，这样，等系统事件触发的时候，执行系统事件池中的run方法；
                //解除重复绑定的问题；
                ele.attachEvent('on'+type,function(){
                    run.call(ele);//解除this问题；
                })
            }
            var a=ele['aEvent'+type];
            //往自己事件池中，放要绑定的函数；
            for(var i=0; i< a.length; i++){
                if(a[i]==fn) return;
            }
            a.push(fn);
        }
    }
}
//作用：就是拿到自定义属性上的数组，然后把数组中的所有方法顺序调用；
//run只针对IE浏览器
function run(){
    var e=window.event;
    var type= e.type;
    e.target= e.srcElement;//事件源兼容处理
    e.pageX=(document.documentElement.scrollLeft||document.body.scrollLeft)+ e.clientX;//当前鼠标落脚点到第一屏左上角的坐标位置
    e.pageY=(document.documentElement.scrollTop||document.body.scrollTop)+ e.clientY;
    e.preventDefault=function(){//阻止默认事件
        e.returnValue=false;
    };
    e.stopPropagation=function(){//阻止冒泡
        e.cancelBubble=true;
    };
    var a=this['aEvent'+type];
    if(a && a.length){
        for(var i=0; i< a.length; i++){
            if(typeof a[i]=='function'){
                a[i].call(this,e);
            }else{
                a.splice(i,1);
                i--;
            }
        }
    }
}
function off(ele,type,fn){
    if(/^self/.test(type)){//解除自定义事件绑定
        var a=ele[type];
        if(a && a.length){
            for(var i=0; i< a.length; i++){
                if(a[i]==fn){
                    a[i]=null;
                    break;
                }
            }
        }
    }else{//解除系统事件绑定；
        if(ele.removeEventListener){
            ele.removeEventListener(type,fn,false);
        }else{//处理IE兼容性：
            //1.拿到自定义属性上存的数组；
            var a=ele['aEvent'+type];
            if(a && a.length){
                for(var i=0; i< a.length; i++){
                    if(a[i]==fn){
                        a[i]=null;
                        break;
                    }
                }
            }
        }
    }
}
//fire:发布：把自定义行为下，提前绑定好的所有方法，进行顺序调用；
function fire(ele,type,e){
    //1.拿到自定义行为下的数组
    var a=ele[type];
    //2.把数组中的函数进行顺序调用；
    if(a && a.length){
        for(var i=0; i< a.length; i++){
            if(typeof a[i]=='function'){
                a[i].call(ele,e)
            }else{
                a.splice(i,1);
                i--;
            }
        }
    }
}
//processThis功能：改变函数中的this指向，并且返回函数的定义阶段
function processThis(fn,context){
    return function (e){
        fn.call(context,e)//move.call(context,e)
    }
}








