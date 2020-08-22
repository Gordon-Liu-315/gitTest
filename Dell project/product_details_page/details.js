define(["jquery","jquery-cookie"],function($){
    //滑入淡入淡出
    function fade(){
            var lis = $("#nav-center-ul li");
            // var divs = $("#nav-center-ul li div");
            lis.hover(function(){
                $(this).children("div").stop(true).fadeIn(300);
            },function(){
                $(this).children("div").stop(true).fadeOut(300);
            })
    }
    //侧边栏选项卡
    function selectCard(){
            var lis1 = $(".nav-center-ul-allproduct ul").eq(0).find("li").not("li:first");
            var lis2 = $(".nav-center-ul-allproduct ul").eq(1).find("li").not("li:first");
            var lis3 = $(".nav-center-ul-allproduct ul").eq(2).find("li").not("li:first");
            var div = $(".nav-center-ul-allproduct-content");
            var allproduct = $(".nav-center-ul-allproduct");
            div.on({
                "mouseenter":function(){
                allproduct.css("display","block");
                $(this).css("display","block");
                },
                "mouseleave":function(){
                    $(this).css("display","none");
                }
            })
            lis1.on({
                "mouseenter":function(){
                    lis1.attr("class","");
                    div.attr("display","none").eq($(this).index()-1).attr("class","nav-center-ul-allproduct-content").css("display","block");
                    $(this).attr("class","nav-center-ul-allproduct-active");
                },
                "mouseleave":function(){
                    div.css("display","none");
                    $(this).attr("class","");
                }
            })
            lis2.on({
                "mouseenter":function(){
                    lis2.attr("class","");
                    div.attr("display","none").eq($(this).index()+3).attr("class","nav-center-ul-allproduct-content").css("display","block");
                    $(this).attr("class","nav-center-ul-allproduct-active");
                },
                "mouseleave":function(){
                    div.css("display","none");
                    $(this).attr("class","");
                }
            })
            lis3.on({
                "mouseenter":function(){
                    lis3.attr("class","");
                    div.attr("display","none").eq($(this).index()+7).attr("class","nav-center-ul-allproduct-content").css("display","block");
                    $(this).attr("class","nav-center-ul-allproduct-active");
                },
                "mouseleave":function(){
                    div.css("display","none");
                    $(this).attr("class","");
                }
            })
    }
	//侧边弹出窗
	function sidewindow(){
        var win = $("#side");
        var btn = $("#side-btn");
        var remove = $(".side-remove");
        btn.click(function(){
            win.animate({
                right:-20,
            },500)
        })
        remove.click(function(){
            win.animate({
                right:-302,
            },500)
        })
    }    
    return{
        fade:fade,
        selectCard:selectCard,
        sidewindow:sidewindow,
    }
})