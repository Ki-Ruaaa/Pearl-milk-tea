/**
 * Created by 墨寒卿 on 2020/8/31.
 */
var move;//移动定时函数对象
var back;//返回定时函数对象
var left;//杯子与左边距离数值
var suDu =10;//杯子移动初始速度
var ZZID = 1;//珍珠ID，初始值为1
var ZZJS = 20;//珍珠下降速度，初始值为20
var fenShu = 0;//分数，初始值为0
var fanHuiSD = 1;//杯子返回速度，控制，初始值为1
var ZsuDu = 1;//珍珠左右移动速度
var fangXiang;//用于区分向左移动还是右移动的方向
var NZZT = 5000;//NewZhenZhuTime创建珍珠所需时间

var section_margin_left = Cpx($("section").css("margin-left"));
var cupWidth = Cpx($("#cup").css("width"));

/*=======通用方法========*/
/*---去单位方法---*/
function Cpx(xpx){
    var num = parseInt(xpx.substring(0,xpx.length-2));
    return num;
}//将原本x像素的值变为去掉px，只有数字的值

newZhenZhuF();
var newZhenZhu = setInterval("newZhenZhuF()",NZZT);//创建珍珠函数对象
var downZhenZhu = setInterval("downZhenZhuF()",ZZJS);//珍珠下降函数对象

$("#LR").mouseover(function(even){//当鼠标进入LR条时
    clearInterval(back);//关闭原本的返回定时函数
    move = setInterval(function(){
        moveF(fangXiang,suDu);
        ZmoveF(fangXiang,ZsuDu);
    },20);//调用moveF函数
});//当鼠标移入时左右移动
$("#LR").mouseout(function(){//当鼠标移出LR条时
    clearInterval(move);//关闭原本的移动定时函数
    back=setInterval(function(){
        left = Cpx($("#cup").css("left"));//获取到杯子left数值
        if(left<(Cpx($("#box").css("width"))*0.5)){//如果当前杯子在左边
            $("#cup").css("left",left-(-1*fanHuiSD)+"px");//则进行右移动
        }else if(left>(Cpx($("#box").css("width"))*0.5)){//如果当前杯子在右边
            $("#cup").css("left",left-fanHuiSD+"px");//则进行左移动
        }//如果都不是，就是在中间，不移动
    },1);//返回定时函数
});//当鼠标移出时返回中间
$("#LR").mousemove(function(even){
    var LR_W = Cpx($("#LR").css("width"));
    if(even.clientX-section_margin_left<LR_W*0.5){
        fangXiang=1;
    }else{
        fangXiang=-1;
    }/*中间点获取不够精准，还有待改进的地方*/
});//当鼠标在LR条中位置变换时

function moveF(fangXiang,suDu){
    left = Cpx($("#cup").css("left"));//获取到杯子left数值
    if(fangXiang==1&&left>Cpx($("#cup").css("width"))*0.5){//如果鼠标移入的是左端，且未到达最左端
        $("#cup").css("left",left-(fangXiang*suDu)+"px");//则进行移动
    }else if(fangXiang==1){//否则如果鼠标移入的是左端，且已到达或超过最左端
        $("#cup").css("left","75px");//回到最左端
    }
    if(fangXiang==-1&&left<(Cpx($("#box").css("width"))-cupWidth*0.5)){//如果鼠标移入的是右端，且未到达最右端
        $("#cup").css("left",left-(fangXiang*suDu)+"px");//则进行移动
    }else if(fangXiang==-1){//否则如果鼠标移入的是右端，且已到达或超过最右端
        $("#cup").css("left",Cpx($("#box").css("width"))-cupWidth*0.5+"px");//则回到最右端
    }
}//鼠标移入LR条时的移动内容方法
function ZmoveF(fangXiang,suDu){
    for(var i =1;i<=20;i++){
        if($("#"+i).css("left")!=null){
            $("#"+i).css("left",$("#"+i).css("left").substring(0,$("#"+i).css("left").length-2)-(fangXiang*suDu)+"px");//进行移动
            if(Cpx($("#"+i).css("left"))<-101){//如果到达了最左端
                $("#"+i).css("left",819+"px");//移至最右端
            }//如果到达了最左端
            if(Cpx($("#"+i).css("left"))>Cpx($("#box").css("width"))){//如果到达了最右端
                $("#"+i).css("left",-101+"px");//移至最左端
            }//如果到达了最右端
        }
    }
}//珍珠的移动内容方法
function newZhenZhuF(){
    var ZhenZhu = $("<div class='zhenZhu' id="+ZZID+"></div>");
    if(ZZID<20){
        ZZID++;
    }else{
        ZZID=1;
    }
    var rad = parseInt(Math.random()*(Cpx($("#box").css("width"))-101));
    ZhenZhu.css({"left":rad+"px"});
    $("#box").append(ZhenZhu);
}//新建珍珠方法
function downZhenZhuF(){
    var Fa = $("#box");
    left = Cpx($("#cup").css("left"));//获取到杯子left数值
    for(var i =1;i<=20;i++){
        if($("#"+i).css("top")!=undefined){
            var Ztop = Cpx($("#"+i).css("top"));
            $("#"+i).css("top",Ztop+1+"px");
            var Zleft = Cpx($("#"+i).css("left"));
            if(Ztop==197&&Zleft>left-108&&Zleft<left+5){
                Fa.children("#"+i).remove();
                fenShu++;
                $("#fenShu").val(fenShu);
                $("#fenShuSpan").val(fenShu);
            }
            if(Ztop>548){
                Fa.children("#"+i).remove();
            }
        }
    }
}//珍珠下降方法

$("#setBtn").click(function(){//当单击“设置”按钮时
    suDu=$("#suDu").val();//设置杯子速度
});//设置杯子速度内容
$("#setBtn_FH").click(function(){//当单击“设置”按钮时
    fanHuiSD=$("#fanHuiSD").val();//设置速度
});//设置返回速度内容
$("#ZZSD_Btn").click(function(){
    ZsuDu=$("#ZZSD").val();
});
$("#ZZJS_Btn").click(function(){
    ZZJS=$("#ZZJS").val();
    clearInterval(downZhenZhu);//关闭原本的移动定时函数
    downZhenZhu = setInterval("downZhenZhuF()",ZZJS);
});//设置珍珠降速内容
$("#NZZT_Btn").click(function(){
    NZZT=$("#NZZT").val();
    clearInterval(newZhenZhu);//关闭原本的移动定时函数
    newZhenZhu = setInterval("newZhenZhuF()",NZZT);//创建珍珠函数对象
});//设置新建珍珠所需时间
$("#L").click(function(){
    left = Cpx($("#cup").css("left"));//获取到杯子left数值
    $("#cup").css("left",left-10+"px");
});//左移按钮
$("#R").click(function(){
    left = Cpx($("#cup").css("left"));//获取到杯子left数值
    $("#cup").css("left",left+10+"px");
});//右移按钮
$("#C").click(function(){
    clearInterval(back);//关闭原本的返回定时函数
});//清除回归方法按钮
$("#fenShu").blur(function(){
    fenShu=$("#fenShu").val();
    $("#fenShuSpan").val(fenShu);
});//设置分数
//var showUI = false;//UR显示状态
$("#close").click(function(){
    $("#UI").css("display","none");
    //showUI=false;
});//调试窗口的隐藏
$("body").keyup(function(even){
    //v:86
    if(even.keyCode==86){
        //if(showUI){
        //    $("#UI").css("display","none");
        //    showUI = false;
        //}
        $("#UI").css("display","block");
        showUI = true;
    }
});
/*======================js布局设置======================*/
var Document_width = $(document).width();//窗口宽度
var Document_height = $(document).height();//窗口高度
$("header").css("height",Document_height*0.08+"px");
$("section").css("height",Document_height*0.92+"px");
$("#box").css("height",(Document_height*0.92)*0.9+"px")
$("#LR").css("height",(Document_height*0.92)*0.1+"px");
$("body").css("height",Document_height+"px");