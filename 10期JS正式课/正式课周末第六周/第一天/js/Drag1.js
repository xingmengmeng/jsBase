/**
 * Created by 39753 on 2016/10/22.
 */
//面向对象版的订阅发布类：针对自定义事件，进行订阅和发布；
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
//构造函数类；
//核心原理：构造函数中所有的this都指向实例；
function Drag(ele){
    this.ele=ele;//决定让哪个元素可以拖拽；
    this.x=this.y=this.mx=this.my=null;
    this.DOWN=processThis(this.down,this);
    this.MOVE=processThis(this.move,this);
    this.UP=processThis(this.up,this);
    on(ele,'mousedown',this.DOWN);
}
Drag.prototype=new EventEmitter;//导致Drag.prototype.constructor错误
Drag.prototype.constructor=Drag;
Drag.prototype.down=function(e){
    this.x=this.ele.offsetLeft;
    this.y=this.ele.offsetTop;
    this.mx= e.clientX;
    this.my= e.clientY;
    if(this.ele.setCapture){
        this.ele.setCapture();
        on(this.ele,'mousemove',this.MOVE);
        on(this.ele,'mouseup',this.UP);
    }else{
        on(document,'mousemove',this.MOVE);
        on(document,'mouseup',this.UP);
        e.preventDefault();
    }
    this.fire('selfDown',e);//留了一个自定义事件selfDown的接口，可以把跟selfDown这个行为有关的所有方法都进行顺序调用；
};
Drag.prototype.move=function(e){
    this.ele.style.left= e.clientX-this.mx+this.x+'px';
    this.ele.style.top= e.clientY-this.my+this.y+'px';
    this.fire('selfMove',e);//给move方法留了一个接口，可以把跟selfMove这个自定义行为有关的方法，都进行顺序调用；
};
Drag.prototype.up=function(e){
    if(this.ele.releaseCapture){
        this.ele.releaseCapture();
        off(this.ele,'mousemove',this.MOVE);
        off(this.ele,'mouseup',this.UP);
    }else{
        off(document,'mousemove',this.MOVE);
        off(document,'mouseup',this.UP);
    }
    this.fire('selfUp',e)//给up留一个接口，可以把跟selfUp这个行为有关的所有方法都进行顺序调用；
};










