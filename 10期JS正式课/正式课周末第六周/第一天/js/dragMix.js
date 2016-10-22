/**
 * Created by 39753 on 2016/10/22.
 */
//纯净版的拖拽
function down(e){
    //存下初始的位置和初始的坐标；
    this.x=this.offsetLeft;
    this.y=this.offsetTop;
    this.mx= e.clientX;
    this.my= e.clientY;
    if(this.setCapture){//IE下捕获焦点
        this.setCapture();
        on(this,'mousemove',move);
        on(this,'mouseup',up);
    }else{//标准浏览器
        this.MOVE=processThis(move,this);
        this.UP=processThis(up,this);
        on(document,'mousemove',this.MOVE);
        on(document,'mouseup',this.UP);
        e.preventDefault();
    }
    clearInterval(this.flyTimer);
    clearInterval(this.dropTimer);
}
function move(e){
    this.style.left= e.clientX-this.mx+this.x+'px';
    this.style.top= e.clientY-this.my+this.y+'px';
    //获取速度
    if(!this.prevSpeed){
        this.prevSpeed= e.clientX;
    }else{
        this.speedX= e.clientX-this.prevSpeed;
        this.prevSpeed= e.clientX;
    }

}
function up(e){
    if(this.releaseCapture){//IE下释放焦点
        this.releaseCapture();
        off(this,'mousemove',move);
        off(this,'mouseup',up);
    }else{
        off(document,'mousemove',this.MOVE);
        off(document,'mouseup',this.UP);
    }
    fly.call(this);
    drop.call(this);
}
function drop(){
    clearInterval(this.dropTimer);
    var _this=this;
    if(!this.speedY){
        this.speedY=9.8;
    }else{
        this.speedY+=9.8;
    }
    this.style.top=this.offsetTop+this.speedY+'px';
    this.dropTimer=setInterval(function(){
        _this.speedY+=9.8;
        _this.speedY*=.93;
        var t=_this.offsetTop+_this.speedY;
        var maxT=(document.documentElement.clientHeight||document.body.clientHeight)-_this.offsetHeight;
        if(t>maxT){
            t=maxT;
            _this.speedY*=-1;
        }
        _this.style.top=t+'px';
    },20)
}
function fly(){
    clearInterval(this.flyTimer);
    var _this=this;
    this.style.left=this.offsetLeft+this.speedX+'px';
    this.flyTimer=setInterval(function(){
        _this.speedX*=0.3;
        _this.style.left=_this.offsetLeft+_this.speedX+'px';
    },20)
}