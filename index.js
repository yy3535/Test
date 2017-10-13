$(function(){
    /**
     * slide轮播图
     */
    var index=0;
    var lis=$(".slide_li");
    var dots=$(".dot_wrapper li");
    var slide_timer;
    var isAutoPlay=true;
    var isCardShow=false;
    var section03Data={};
    var newSection03Data={};
    var menu=$("#nav_content");
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
        var scrollTop=$(window).scrollTop();
        var marginTop=$("#section02_wrapper").css("margin-top");
        if(scrollTop>=453&&marginTop=="300px"){
            $("#section02_wrapper").animate({
                marginTop:'205px'
            },500,function(){
            });
        }
        var opcity=$("#ul_card_wrapper").css("opacity");
        if(scrollTop>=1064&&opcity==0){
        	$("#ul_card_wrapper").animate({
        		opacity:1
        	},1000)
        }
    })

    //数据
    $.ajax({
        type:'get',
        url:'cate1.json',
        async:true,
        success:function(data){
        	section03Data=data;        	
        	//更新card数据
            cardDataUpdate(section03Data);
            isCardShow=true;
        }
    });
    
    //card数据更新
    function cardDataUpdate(data){
    	var tplStr=$("#tpl_card").html();
        //榨汁机模板引擎
        var str=juicer(tplStr,data);
        $("#ul_card_wrapper").html(str);
        
        if(isCardShow){
        	$("#ul_card_wrapper").animate({
	    		opacity:1
	    	},500);
        }
                
        
        //span标签绑定筛选事件
        $("#ul_card_wrapper span").on('click',function(){
			cateFilter($(this).html());
		});
    }
    
    /**
     * section03筛选
     */
    function cateFilter(selectedCate){ 
    	//导航选中效果设置
    	$("#section03 a").removeClass("active");
    	var index=(selectedCate=="all"?0:parseInt(selectedCate.charAt(selectedCate.length-1)));
		$($("#section03 a")[index]).addClass("active");
    	
    	$("#ul_card_wrapper").animate({
    		opacity:0
    	},500,function(){
    		if(selectedCate=="all"){
    			cardDataUpdate(section03Data);
    			
	    	}else{
	    		filteredData(selectedCate);
				cardDataUpdate(newSection03Data);
	    	}
    	});
    	
    	
    	
    	function filteredData(selectedCate){
    		newSection03Data={
    			list:[]
    		};
    		
    		for(var i=0;i<section03Data.list.length;i++){
    			for(var j=0;j<section03Data.list[i].cate.length;j++){
    				var cateInCardString=JSON.stringify(section03Data.list[i].cate);
    				if(cateInCardString.indexOf(selectedCate)!=-1){
    					newSection03Data.list.push(section03Data.list[i]);
    					break;
    				}
    			}
    			
    		}
    	}
    }
    
    
	$("#section03 a").on('click',function(){
		$("#section03 a").removeClass("active");
		$(this).addClass("active");
		cateFilter($(this).html());
	});
	

	/**
	 * 弹出菜单
	 */
	$(".nav").on('click',function(event){
		event.stopPropagation();
		menu.fadeToggle();		
	});
	
	/**
	 * 
	 */
	$("body").on('click',function(){
		if(menu.css("display")=="block"){
			menu.fadeOut();
		}
	})
});