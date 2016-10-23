/**
 * Created by 39753 on 2016/10/23.
 */
function on(ele,type,fn){//作用：用来绑定系统事件
    if(ele.addEventListener){
        ele.addEventListener(type,fn,false);
    }else{//处理IE浏览器的问题：1）顺序2）重复绑定3）this问题；
        if(!ele['aEvent'+type]){
            ele['aEvent'+type]=[];
            ele.attachEvent('on'+type,function(){
                run.call(ele)
            });//解决attachEvent重复绑定的问题；
        }
        var a=ele['aEvent'+type];
        for(var i=0; i< a.length; i++){
            if(a[i]==fn) return;
        }
        a.push(fn);

    }
}
function run(){//只在IE下执行；run作用：就是把自己事件池中的所有方法，进行顺序调用；
    var e=window.event;
    var type= e.type;
    if(!e.target){
        e.target= e.srcElement;//事件源兼容处理
        e.pageX=(document.documentElement.scrollLeft||document.body.scrollLeft)+ e.clientX;
        e.pageY=(document.documentElement.scrollTop||document.body.scrollTop)+ e.clientY;
        e.preventDefault=function(){
            e.returnValue=false;
        };
        e.stopPropagation=function(){
            e.cancelBubble=true;
        };

    }
    var a=this['aEvent'+type];
    if(a && a.length){
        for(var i=0; i< a.length; i++){
            if(typeof a[i]==='function'){
                a[i].call(this,e)
            }else{
                a.splice(i,1);
                i--;
            }
        }
    }
}
function off(ele,type,fn){
    if(ele.removeEventListener){
        ele.removeEventListener(type,fn,false);
    }else{
        var a=ele['aEvent'+type];
        if(a && a.length){
            for(var i=0; i< a.length; i++){
                if(a[i]==fn){
                    a[i]=null;
                }
            }
        }
    }
}
function processThis(fn,context){
    return function (e){
        e=e||window.event;
        fn.call(context,e)
    }
}









