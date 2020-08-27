define(["jquery","jquery-cookie"],function($){
    //滑入淡入淡出
    function fade(){
            var lis = $("#nav-center-ul li");
            // var divs = $("#nav-center-ul li div");
            lis.hover(function(){
                $(this).children("div").stop(true).fadeIn(300);
            },function(){
                $(this).children("div").stop(true).fadeOut(0);
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
    //点击换图
    function changeLevel(){
        var lis = $("#details-le-ul li");
        var box = $("#details-le-box-img");
        var show = $("#details-le-box-show img");
        lis.click(function(){
            var lin = $(this).find("img").attr("src");
            box.attr("src",lin);
            show.attr("src",lin);
        })
    }
    //放大镜
    function bigglass(){
        var mark = $("#details-le-box-mark");
        var box = $("#details-le-box");
        var show = $("#details-le-box-show");
        var img = $("#details-le-box-show img")
        box.on({
            mouseenter:function(){
                mark.css("display","block");
                show.css("display","block");
            },
            mousemove:function(e){
                var l = e.pageX - box.offset().left - 95;
                var t = e.pageY - box.offset().top - 95;
                l = Math.min(l,190);
                l = Math.max(l,0);
                t = Math.min(t,190);
                t = Math.max(t,0);
                mark.css({
                    left:l,
                    top:t
                })
                img.css({
                    left:l * -2,
                    top:t * -2
                })
            },
            mouseleave:function(){
                mark.css("display","none");
                show.css("display","none");
            }
        })

    }
    //配置选项
    function allocation(){
        var ps = $(".details-cen-allocation-con p");
        var icons = $(".details-cen-allocation-con p .iconfont")
        ps.on({
            mouseenter:function(){
							icons.eq($(this).index()).css("display","block");
						},
						mouseleave:function(){
							icons.eq($(this).index()).css("display","none");
						}
        })
	}
	//服务选项
	function help(){
			var ps = $(".details-cen-help p");
			var icons = $(".helps");
			ps.click(function(){
				icons.css("display","none");
				ps.attr("class","");
				icons.eq($(this).index()-1).css("display","block");
				$(this).attr("class","active-p");
			})
	}
	//分期选项
	function pay(){
			var imgs = $(".details-cen-pay img");
			var uls = $(".uls");
			imgs.on("click",function(){
				uls.css("display","none");
				uls.eq($(this).index()-1).css("display","block");
			})
    }
    //首页搜索数据
    function homedata(){
			var inp = $(".nav-center-search-inp");
			var search = $(".nav-center-search-inp-icon");
			var allcon = $("#search-allproducts").nextUntil("#help");
			$(document).keydown(function(event){  
				if(event.keyCode==13){  
				 search.click();
				}  
			 });
			search.click(function(){
				$("#search-allproducts p").css("display","block");
				allcon.css("display","none");
				var value = inp.val();
				$.get("../data/data.json",function(arr){
					let str = ``;
					let num = 0;
					for(let i = 0; i < arr.length; i++){
						var strname = JSON.stringify(arr[i].name);
						var index = strname.indexOf(value,0);
						if(index >= 0){
							num += index/index;
							str += 
							`	
							<div id = "search-allproducts-product">
									<img src="${arr[i].img}" alt="">
									<h3>${arr[i].name}</h3>
									<a href="">${arr[i].style}</a>
									<b>${arr[i].type}</b>
									<div id = "search-allproducts-product-pay">
										<del>${arr[i].oldprice}</del>
										<span>${arr[i].newprice}</span>
										<button class="${arr[i].id}">立即购买</button>
									</div>
								</div>
							`
						}
						if(!value){
							num = 40;
						}
					}
					$("#search-allproducts-con").html(str);
					$(".search-allproducts-num").html(num);
				})
			})
    }
    //存储本地信息1
    function cookie1(){
        var cart = $("details-cen-btn-cart");
        var sub = $(".details-cen-count-subtract");
        var plus = $(".details-cen-count-plus");
        var num = $(".details-cen-count-number");
        $(".details-cen-btn").on("click",cart,function(){
            $.get("../data/data.json",function(arr){
                var first = $.cookie("notebook") == null ? true : false;
                var id = arr[0].id;
                if(first){
                    var data = [{id:id,num:1}];
                    $.cookie("notebook",JSON.stringify(data),{expires:7});
                }else{
                    var cookieArr = JSON.parse($.cookie("notebook"));
                    var same = false;
                    for(var i = 0; i < cookieArr.length; i++){
                        if(cookieArr[i].id == id){
                            cookieArr[i].num++;
                            same = true;
                        }
                    }
                    if(!same){
                        var obj = {id:id,num:1};
                        //将数据插入到数据中
                        cookieArr.push(obj);
                    }
                    $.cookie("notebook",JSON.stringify(cookieArr),{expires:7});
                }
            })
            alert("商品添加成功");
        })
        var allnum = 0;
        sub.click(function(){
            $.get("../data/data.json",function(arr){
                var cookieArr =  JSON.parse($.cookie("notebook"))
                var id = arr[0].id;
                for(var k = 0;k < cookieArr.length; k++){
                    if(cookieArr[k].id == id){
                        cookieArr[k].num--;
                        if(cookieArr[k].num == 0){
                            alert("没有此商品，请添加");
                        }
                    }
                }
                $.cookie("notebook",JSON.stringify(cookieArr),{expires:7});
            })
            allnum--
            if(num.html() == 0){
                alert("请添加此商品");
                allnum = 0;
            }
            num.html(allnum);
        })

        plus.click(function(){
            $.get("../data/data.json",function(arr){
                var cookieArr =  JSON.parse($.cookie("notebook"))
                var id = arr[0].id;
                for(var l = 0;l < cookieArr.length; l++){
                    if(cookieArr[l].id == id){
                        cookieArr[l].num++;
                    }
                }
                $.cookie("notebook",JSON.stringify(cookieArr),{expires:7});
                allnum++
                num.html(allnum);
            })
        })
    }

    return{
        fade:fade,
        selectCard:selectCard,
        sidewindow:sidewindow,
        changeLevel:changeLevel,
        bigglass:bigglass,
		allocation:allocation,
		pay:pay,
        help:help,
        homedata:homedata,
        cookie1:cookie1,
    }
})