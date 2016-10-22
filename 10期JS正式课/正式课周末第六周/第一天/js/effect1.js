/**
 * Created by 39753 on 2016/10/22.
 */
//提高层级思路2：
var zIndex=0;
function creaseIndex(){
    //提高层级的思路1：
    /*for(var i=0; i<aDiv.length; i++){
     aDiv[i].style.zIndex=0;
     }
     this.style.zIndex=1;*/
    this.style.zIndex=++zIndex;
}
function removeEffect(){//当鼠标按下的时候，停止运动
    clearTimeout(this.flyTimer);
    clearTimeout(this.dropTimer);
}
//drop纵向运动
function drop(){
    clearTimeout(this.dropTimer);
    if(!this.speedY){
        this.speedY=9.8;
    }else{
        this.speedY+=9.8;
    }
    this.speedY*=0.93;
    var t=this.offsetTop+this.speedY;
    var maxT=(document.documentElement.clientHeight||document.body.clientHeight)-this.offsetHeight;
    if(t>=maxT){//碰到地面
        t=maxT;
        this.speedY*=-1;
        this.flg++;//1 2 3 4
    }else{//没碰到地面
        this.flg=0;
    }
    this.style.top=t+'px';
    if(this.flg<2){
        this.dropTimer=setTimeout(processThis(drop,this),20);
    }
}
//fly横向运动
function fly(){
    clearTimeout(this.flyTimer);
    this.speedX*=0.93;
    var l=this.offsetLeft+this.speedX;
    var maxL=(document.documentElement.clientWidth||document.body.clientWidth)-this.offsetWidth;
    if(l>maxL){
        l=maxL;
        this.speedX*=-1;
    }else if(l<0){
        l=0;
        this.speedX*=-1;
    }
    this.style.left=l+'px';
    if(Math.abs(this.speedX)>=0.5){
        this.flyTimer=setTimeout(processThis(fly,this),20);
    }
}
//求横向速度；
function getSpeed(e){
    if(!this.prevSpeed){
        this.prevSpeed= e.clientX;
    }else{
        this.speedX= e.clientX-this.prevSpeed;
        this.prevSpeed= e.clientX;
    }
}