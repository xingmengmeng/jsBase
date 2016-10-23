/**
 * Created by 39753 on 2016/10/23.
 */
//EventEmitter类：作用-》客户端产品升级+开发版版本升级
function EventEmitter(){};
EventEmitter.prototype.on=function(type,fn){//事件订阅；事件绑定-》把一系列不相关的方法，跟某个行为（自定义行为）绑定在一起；
    if(!this['aEmitter'+type]){
        this['aEmitter'+type]=[];
    }
    var a=this['aEmitter'+type];
    for(var i=0; i< a.length; i++){
        if(a[i]==fn) return;
    }
    a.push(fn);
    return this;//目的为了链式操作；
};
EventEmitter.prototype.fire=function(type,e){//事件发布：--监听的作用；fire的本质：等fire监听到系统事件发生的时候，把type这个行为下绑定的所有方法进行顺序调用；
    var a=this['aEmitter'+type];
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
};
EventEmitter.prototype.off=function(type,fn){//解除自定义行为的事件绑定；
    var a=this['aEmitter'+type];//拿到自定义属性上的数组
    if(a && a.length){
        for(var i=0; i< a.length; i++){
            if(a[i]==fn){
                a[i]=null;
            }
        }
    }
};
//Drag类：真正核心的产品；
function Drag(ele){
    this.ele=ele;
    this.x=this.y=this.mx=this.my=null;
    this.DOWN=processThis(this.down,this);
    this.MOVE=processThis(this.move,this);
    this.UP=processThis(this.up,this);
    on(this.ele,'mousedown',this.DOWN);
}
Drag.prototype=new EventEmitter();
Drag.prototype.constructor=Drag;
Drag.prototype.down=function(e){
    //1.给位置赋值 2.绑定move方法和up方法
    this.x=this.ele.offsetLeft;
    this.y=this.ele.offsetTop;
    this.mx= e.clientX;
    this.my= e.clientY;
    this.zIndex=0;
    if(this.ele.setCapture){
        this.ele.setCapture();
        on(this.ele,'mousemove',this.MOVE);
        on(this.ele,'mouseup',this.UP);
    }else{
        on(document,'mousemove',this.MOVE);
        on(document,'mouseup',this.UP);
        e.preventDefault();
    }
    this.fire('selfDown',e)
};
Drag.prototype.move=function(e){
    this.ele.style.left= e.clientX-this.mx+this.x+'px';
    this.ele.style.top= e.clientY-this.my+this.y+'px';
    this.fire('selfMove',e)
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
    this.fire('selfUp',e)
};

Drag.prototype.range=function(oRange){
    this.oRange=oRange;
    //this.on('selfDown',this.creaseIndex);
    this.on('selfMove',this.addRange);
};
Drag.prototype.addRange=function(e){
    var l=e.clientX-this.mx+this.x;
    var t=e.clientY-this.my+this.y;
    if(l<this.oRange.left){
        l=this.oRange.left;
    }else if(l>this.oRange.right){
        l=this.oRange.right
    }
    if(t<this.oRange.top){
        t=this.oRange.top;
    }else if(t>this.oRange.bottom){
        t=this.oRange.bottom
    }
    this.ele.style.left=l+'px';
    this.ele.style.top=t+'px';
};
Drag.prototype.border=function(){
    this.on('selfDown',this.addBorder);
    this.on('selfUp',this.removeBorder);
};
Drag.prototype.addBorder=function(){
    this.ele.style.border='1px dashed red';
    this.oImg=this.ele.getElementsByTagName('img')[0];
    this.oldBg=this.ele.style.background;
    this.ele.removeChild(this.oImg);
    this.ele.style.background='none';
};
Drag.prototype.removeBorder=function(){
    this.ele.appendChild(this.oImg);
    this.ele.style.background=this.oldBg;
    this.ele.style.border='none';
};
Drag.prototype.jump=function(){
    this.on('selfDown',removeEffect);
    this.on('selfMove',getSpeed);
    this.on('selfUp',fly);
    this.on('selfUp',drop);
};















