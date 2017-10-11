$(function(){
    /**
     * slide轮播图
     */
    var index=0;
    var lis=$(".slide_li");
    var dots=$(".dot_wrapper li");
    var slide_timer;
    var isAutoPlay=true;
    function setTimer(){
        slide_timer=setInterval(function(){
            switchImg();
        },4000);
    }
    /**
     * 换图
     */
    function switchImg(){
        if(index!=2){
            $(dots[index]).removeClass('dot_current');
            $(dots[index]).addClass('dot');
            $(dots[index+1]).removeClass('dot');
            $(dots[index+1]).addClass('dot_current');
            $(lis[index]).animate({
                opacity:0
            },1000,function(){
                
                index++;
            })
            $(lis[index+1]).animate({
                opacity:1
            },1000)
            
        }else{
            $(dots[2]).removeClass('dot_current');
            $(dots[2]).addClass('dot');
            $(dots[0]).removeClass('dot');
            $(dots[0]).addClass('dot_current');
            $(lis[2]).animate({
                opacity:0
            },1000,function(){
                
                index=0;
            })
            $(lis[0]).animate({
                opacity:1
            },1000)
            
        }
    }

    //自动播放轮播图
    if(isAutoPlay){
        setTimer();
    }
    
    //圆点点击事件绑定
    dots.on('click',function(){
        var indexClick=$(this).index();
        clearInterval(slide_timer);
        //变换成点击的图片
        $(dots[index]).removeClass('dot_current');
        $(dots[index]).addClass('dot');
        $(dots[indexClick]).removeClass('dot');
        $(dots[indexClick]).addClass('dot_current');
        $(lis[index]).animate({
            opacity:0
        },1000,function(){
            index=indexClick;
            if(isAutoPlay){
                setTimer();
            }
        })
        $(lis[indexClick]).animate({
            opacity:1
        },1000)
        
    })

    //图片移入事件绑定
    $('#slide').on('mouseover',function(){
        //console.log("移入");
        isAutoPlay=false;
        clearInterval(slide_timer);
    });
    //图片移出事件绑定
    $('#slide').on('mouseout',function(){
        //console.log("移出");
        isAutoPlay=true;
        if(isAutoPlay){
            setTimer();
        }
    });

    /**
     * section02动画效果
     */
    $(window).on('scroll',function(){
        console.log('滚动了');
        var scrollTop=$(window).scrollTop();
        var marginTop=$("#section02_wrapper").css("margin-top");
        if(scrollTop>=453&&marginTop=="300px"){
            $("#section02_wrapper").animate({
                marginTop:'205px'
            },500,function(){
            });
        }
    })
    


});