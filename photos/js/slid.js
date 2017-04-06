/**
 * Created by hxsd on 2016/10/5.
 */
//imaX_Num X轴图片数量  imaY_Num Y轴图片数量 imaWid图片的宽度 imaHei图片的高度
(function(Num,imaWid,imaHei){
    var oUl=document.getElementById('slid');
    var li_positionX_rate=100/Num;
    var li_positionY_rate=100/Num;
    var strong_positionX_rate=100/(Num-1);
    var strong_positionY_rate=100/(Num-1);
    oUl.style.height=document.documentElement.clientHeight*0.8+'px';
    window.onresize=function(){
        oUl.style.height=document.documentElement.clientHeight*0.8+'px';
    };
    for(var i=0;i<Num*Num; i++){
        //遍历所有图片 创建li标签img标签将图片整齐的排布进页面中
        var oLi=document.createElement('li');
        oUl.appendChild(oLi);
        oLi.innerHTML="<img src='images/"+i+".jpg'>" +
            "<a></a>" +
            "<strong></strong>";
        var oA=oLi.getElementsByTagName('a')[0];
        var oStrong=oLi.getElementsByTagName('strong')[0];
        var oImg=oLi.getElementsByTagName('img')[0];
        var a=parseInt(Math.random()*40-20);
        var w=oUl.offsetWidth;
        var h=oUl.offsetHeight;
        var e=parseInt(w-imaWid)/20;
        var f=parseInt(h-imaHei)/20;

        oLi.index=i;

        oLi.style.width=imaWid/Num+'px';
        oLi.style.height=imaHei/Num+'px';

        oLi.style.left=(i%Num)*li_positionX_rate+'%';
        oLi.style.top=parseInt(i/Num)*li_positionY_rate+'%';

        oImg.style.left=5+'%';
        oImg.style.top=5+'%';


        //保存旋转的角度  以便于实现动画
        oLi.transform_rotate=a;
        oA.transform_rotate=a;
        oStrong.transform_rotate=a;

        oLi.style.oTransform="rotate("+a+"deg)";
        oLi.style.mozTransform="rotate("+a+"deg)";
        oLi.style.webkitTransform="rotate("+a+"deg)";
        oLi.style.msTransform="rotate("+a+"deg)";

        oLi.style.transform="rotate('+a+'deg)";

        oA.style.oTransform="rotate("+a+"deg)";
        oA.style.mozTransform="rotate("+a+"deg)";
        oA.style.webkitTransform="rotate("+a+"deg)";
        oA.style.msTransform="rotate("+a+"deg)";

        oA.style.transform="rotate('+a+'deg)";

        oStrong.style.oTransform="rotate("+a+"deg)";
        oStrong.style.mozTransform="rotate("+a+"deg)";
        oStrong.style.webkitTransform="rotate("+a+"deg)";
        oStrong.style.msTransform="rotate("+a+"deg)";

        oStrong.style.transform="rotate('+a+'deg)";

        //给每个li绑上点击事件

        oLi.onclick=function(){
            //点击后找到所有的img和li  利用for和计时器来做动画
            var aImg=oUl.getElementsByTagName('img');
            var aLi=oUl.getElementsByTagName('li');
            var aA=oUl.getElementsByTagName('a');
            var aStrong=oUl.getElementsByTagName('strong');
            var n=0;
            var x=this.index;
            var time_wh_one=null;
            var time_rotate_one=null;
            var time_wh_two=null;
            var time_rotate_two=null;
            var c=0;
            for(var i=0;i<aLi.length;i++){
                aLi[i].transform_rotate_one=aLi[i].transform_rotate;
                aLi[i].transform_rotate_two=0;

                aA[i].transform_rotate_one=aA[i].transform_rotate;
                aA[i].transform_rotate_two=0;

                aStrong[i].transform_rotate_one=aStrong[i].transform_rotate;
                aStrong[i].transform_rotate_two=0;
            }
            if(oUl.className.indexOf('ac')==-1){
                oUl.className='ac';
                clearInterval(time_wh_one);
                //调整图片的宽高
                time_wh_one=setInterval(function(){
                    //先让图片填满li且正确定位
                    n++;
                    if(n==(6)){
                        //表示这个过程已完成
                        clearInterval(time_wh_one);
                        //进行旋转动画
                        rotate_one()
                    }
                    for(var j=0;j<aImg.length;j++){
                        aImg[j].style.left=(5-n)+'%';
                        aImg[j].style.top=(5-n)+'%';
                        aImg[j].style.width=(90+n*2)+'%';
                        aImg[j].style.height=(90+n*2)+'%';
                    }
                },100);
                //旋转
                function rotate_one(){
                    clearInterval(time_rotate_one);
                    time_rotate_one=setInterval(function(){
                        c++;
                        for(var i=0;i<aStrong.length;i++){
                            aImg[i].style.opacity=1-c/20;
                            aLi[i].style.background="#000";
                            aStrong[i].style.opacity=c/20;
                            aStrong[i].style.border=" 1px solid #000";
                            aStrong[i].style.backgroundImage="url('images/"+x+".jpg')";
                            aStrong[i].style.backgroundRepeat="no-repeat";
                            aStrong[i].style.backgroundPosition=(i%Num)*strong_positionX_rate+"%"+parseInt(i/Num)*strong_positionY_rate+"%";
                        }
                        if(c==21){
                            oUl.style.width=imaWid+"px";
                            oUl.style.height=imaHei+"px";
                            clearInterval(time_rotate_one);
                        }else {
                            oUl.style.width=(w-e*c)+"px";
                            oUl.style.height=(h-f*c)+"px";
                            oUl.style.top=(f*c)/2+"px";
                            oUl.style.left=(e*c)/2+"px";
                            for(var b=0;b<aLi.length;b++){ //通过for循环使旋转角度重新为0；
                                if(aLi[b].transform_rotate_one==0){
                                }else if(aLi[b].transform_rotate_one<0){
                                    aLi[b].transform_rotate_one++;
                                }else {
                                    aLi[b].transform_rotate_one--;
                                };
                                if(aA[b].transform_rotate=0){

                                }else if(aA[b].transform_rotate<0){
                                    aA[b].transform_rotate++;
                                }else {
                                    aA[b].transform_rotate--;
                                };
                                if(aStrong[b].transform_rotate_one==0){

                                }else if(aStrong[b].transform_rotate_one<0){
                                    aStrong[b].transform_rotate_one++;
                                }else {
                                    aStrong[b].transform_rotate_one--;

                                };
                                aLi[b].style.transform="rotate("+aLi[b].transform_rotate_one+"deg)";
                                aA[b].style.transform="rotate("+aA[b].transform_rotate+"deg)";
                                aStrong[b].style.transform="rotate("+aStrong[b].transform_rotate_one+"deg)";
                            }
                        }
                    },50)
                }
            }else {
                oUl.className='';
                //旋转
                function rotate_two(){
                    clearInterval(time_wh_two);
                    time_wh_two=setInterval(function(){
                        //先让图片填满li且正确定位
                        n++;
                        if(n==6){
                            //表示这个过程已完成
                            clearInterval(time_wh_two);
                        }
                        for(var j=0;j<aImg.length;j++){
                            aImg[j].style.left=n+'%';
                            aImg[j].style.top=n+'%';
                            aImg[j].style.width=(100-n*2)+'%';
                            aImg[j].style.height=(100-n*2)+'%';
                        }
                    },100);
                }
                clearInterval(time_rotate_two);
                //调整图片宽高
                time_rotate_two=setInterval(function(){
                    c++;
                    for(var i=0;i<aStrong.length;i++){
                        aImg[i].style.opacity=c/20;
                        aLi[i].style.background="#fff";
                        aStrong[i].style.opacity=1-c/20;
                    }
                    if(c==21){
                        clearInterval(time_rotate_two);
                        rotate_two()
                    }
                    oUl.style.width=(imaWid+e*c)+"px";
                    oUl.style.height=(imaHei+f*c)+"px";
                    oUl.style.top=f*(20-c)/2+"px";
                    oUl.style.left= e * (20-c) /2+"px";
                    for(var b=0;b<aLi.length;b++){ //
                        if(aLi[b].transform_rotate_two!==aLi[b].transform_rotate){
                            if(aLi[b].transform_rotate<0){
                                aLi[b].transform_rotate_two--;
                            }else {
                                aLi[b].transform_rotate_two++;
                            }
                        }
                        if(aA[b].transform_rotate=0){

                        }else if(aA[b].transform_rotate<0){
                            aA[b].transform_rotate++;
                        }else {
                            aA[b].transform_rotate--;
                        }
                        if(aStrong[b].transform_rotate=0){

                        }else if(aStrong[b].transform_rotate<0){
                            aStrong[b].transform_rotate++;
                        }else {
                            aStrong[b].transform_rotate--;
                        }
                        aLi[b].style.transform="rotate("+aLi[b].transform_rotate_two+"deg)";
                        aA[b].style.transform="rotate("+aA[b].transform_rotate+"deg)";
                        aStrong[b].style.transform="rotate("+aStrong[b].transform_rotate+"deg)";
                    }
                },50)
            }
        }
    }
})(5,980,500);
