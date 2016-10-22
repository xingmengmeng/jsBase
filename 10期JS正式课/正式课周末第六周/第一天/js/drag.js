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
    fire(this,'selfDown',e);//发布：留的是当鼠标按下的时候，要做事情的接口；
}
function move(e){
    this.style.left= e.clientX-this.mx+this.x+'px';
    this.style.top= e.clientY-this.my+this.y+'px';
    fire(this,'selfMove',e);//留的是当鼠标移动的时候，要做事情的接口
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
    fire(this,'selfUp',e);//留的鼠标抬起后，要做事情的接口
}