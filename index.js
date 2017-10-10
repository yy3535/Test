$(function(){
    /**
     * slide轮播图
     */
    var index=0;
    var lis=$(".slide_li");
    var dots=$(".dot_wrapper li");
    var slide_timer=setInterval(function(){
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
    },2000);

    dots.on('click',function(){
        
    })

});