/**
 * Created by 39753 on 2016/10/22.
 */
function EventEmitter(){};
EventEmitter.prototype.on=function(type,fn){//给自定义事件绑定方法；--事件订阅；
    if(!this['aEmitter'+type]){
        this['aEmitter'+type]=[];
    }
    var a=this['aEmitter'+type];
    for(var i=0; i< a.length; i++){
        if(a[i]==fn) return;
    }
    a.push(fn);
};
EventEmitter.prototype.fire=function(type,e){//事件发布：
    var a=this['aEmitter'+type];//1.拿到数组
    if(a && a.length){//2.对数组进行循环调用；
        for(var i=0; i< a.length; i++){
            if(typeof a[i]=='function'){
                a[i].call(this,e);
            }else{
                a.splice(i,1);
                i--;
            }
        }
    }
};
EventEmitter.prototype.off=function(type,fn){//解除自定义事件绑定；
    var a=this['aEmitter'+type];//1.拿到数组
    if(a && a.length){//2.循环比较
        for(var i=0; i< a.length; i++){
            if(a[i]==fn){
                a[i]=null;
                break;
            }
        }
    }
};