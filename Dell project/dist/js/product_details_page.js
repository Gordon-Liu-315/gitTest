define(["jquery","jquery-cookie"],function($){
        //滑入淡入淡出
        function fade(){
            var lis = $(".nav-center-ul li");
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
        $("#details").on("click","#details-le-ul li",function(){
            var lin = $(this).find("img").attr("src");
            var box = $("#details-le-box-img");
            var show = $("#details-le-box-show img");
            box.attr("src",lin);
            show.attr("src",lin);
        })
    }
    //放大镜
    function bigglass(){
        $("#details").on("mouseenter","#details-le-box",function(){
            var mark = $("#details-le-box-mark");
            var show = $("#details-le-box-show");
            mark.css("display","block");
            show.css("display","block");
            $("#details").on("mousemove","#details-le-box",function(e){
                var l = e.pageX - $(this).offset().left - 95;
                var t = e.pageY - $(this).offset().top - 95;
                l = Math.min(l,190);
                l = Math.max(l,0);
                t = Math.min(t,190);
                t = Math.max(t,0);
                $("#details-le-box-mark").css({
                    left:l,
                    top:t
                })
                $("#details-le-box-show img").css({
                    left:l * -2,
                    top:t * -2
                })
            })
        })
        $("#details").on("mouseleave","#details-le-box",function(){
            $("#details-le-box-mark").css("display","none");
            $("#details-le-box-show").css("display","none");
        })
    }
    //配置选项
    function allocation(){
				$("#details").on("mouseenter",".details-cen-allocation-con p",function(){
					$(".details-cen-allocation-con p .iconfont").eq($(this).index()).css("display","block");
				})
				$("#details").on("mouseleave",".details-cen-allocation-con p",function(){
					$(".details-cen-allocation-con p .iconfont").eq($(this).index()).css("display","none");
				})
	}
	//服务选项
	function help(){
			$("#details").on("click",".details-cen-help p",function(){
				$(".helps").css("display","none");
				$(".details-cen-help p").attr("class","");
				$(".helps").eq($(this).index()-1).css("display","block");
				$(this).attr("class","active-p");
			})
	}
	//分期选项
	function pay(){			
			$("#details").on("click",".details-cen-pay img",function(){
				var uls = $(".uls");
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
    //商品页面
    function allproducts(){
        var details = $("#details");
        var cookieArr = JSON.parse($.cookie("productdata"));
        $.get("../data/data.json",function(arr){
            var str = ``;
            for(var i = 0; i < arr.length; i++){
                if(cookieArr == arr[i].id){
                    str =
                    `
                    <div id = "details">
                        <div id = "details-le">
                            <div id = "details-le-box">
                                <img id = "details-le-box-img" src="${arr[i].img1}" alt="">
                                <div id = "details-le-box-mark"></div>
                            </div>
                            <div id = "details-le-box-show"><img src="${arr[i].img1}" alt=""></div>
                            <ul id = "details-le-ul">
                                <li><img src="${arr[i].img1}" alt=""></li>
                                <li><img src="${arr[i].img2}" alt=""></li>
                                <li><img src="${arr[i].img3}" alt=""></li>
                                <li><img src="${arr[i].img4}" alt=""></li>
                                <li><img src="${arr[i].img5}" alt=""></li>
                            </ul>
                            <p id = "details-le-icon"><i class="iconfont">&#xe63e;</i>收藏商品（0人气）</p>
                        </div>
                        <div id = "details-cen">
                            <h2>${arr[i].style}</h2>
                            <span>产品型号：${arr[i].type}</span>
                            <p class="details-cen-discounts">【限量好礼】自主下单送火星引力礼盒</p>
                            <p class="details-cen-discounts">【晒单好礼】晒单好评赠戴尔光电鼠标</p>
                            <div class="details-cen-price">
                                <del>￥${arr[i].oldprice}</del>
                                <div class="details-cen-price-cen"><span>特惠价</span><p>￥${arr[i].newprice}</p><span>折扣</span><p>￥${arr[i].oldprice - arr[i].newprice}</p></div>
                                <p>【分期特惠】享花呗3期分期免息</p>
                            </div>
                            <div class="details-cen-allocation">
                                <span>配置</span>
                                <div class="details-cen-allocation-con">
                                    <p><b>现货</b> i7/16GB/512GB SSD/GTX1650Ti 4G<i class="iconfont">&#xe607;</i></p>
                                    <p><b>现货</b> i7/16GB/512GB SSD/GTX1650Ti 4G<i class="iconfont">&#xe607;</i></p>
                                    <p><b>预售</b> i7/16GB/512GB SSD/GTX1650 4G<i class="iconfont">&#xe607;</i></p>
                                    <p><b>预售</b> i5/16GB/512GB SSD/GTX1650Ti 4G<i class="iconfont">&#xe607;</i></p>
                                </div>
                            </div>
                            <span>*此处配置参数仅供参考，请以下单后您邮箱收到订单确认函为准。</span>
                            <div class = "details-cen-gift">
                                <span>赠品</span>
                                <p>轻薄双肩背包</p>
                                <p>无线鼠标</p>
                            </div>
                            <div class="details-cen-help">
                                <span>服务</span>
                                <p>官方标配<i class="iconfont helps">&#xe607;</i></p>
                                <p>129元升至二年24x7 优先支持(上门)<i class="iconfont helps">&#xe607;</i></p>
                            </div>
                            <div class = "details-cen-pay">
                                <span>分期</span>
                                <img src="images/zhangshang.jpg" alt="">
                                <img src="images/huabei.jpg" alt="">
                            </div>
                            <ul class="details-cen-money1 uls">
                                <i class="iconfontttt"></i>
                                <li>3111.9元x3期（含手续费）</li>
                                <li>5461.3元x5期（含手续费）</li>
                                <li>6541.2元x7期（含手续费）</li>
                            </ul>
                            <ul class="details-cen-money2 uls">
                                <i class="iconfontttt"></i>
                                <li>8645.2元x3期（含手续费）</li>
                                <li>6544.5元x5期（含手续费）</li>
                                <li>5412.2元x7期（含手续费）</li>
                            </ul>
                            <div class="details-cen-count">
                                <span>数量</span><button class = "details-cen-count-subtract">-</button><p class = "details-cen-count-number">1</p><button class = "details-cen-count-plus">+</button><span>库存 19 件 已售出 4 件</span>
                            </div>
                            <div class = "details-cen-btn">
                                    <form action="shopping_cart.html">
                                        <button class = "details-cen-btn-shopping">立即购买</button>
                                    </form>
                                    <button class = "details-cen-btn-cart">加入购物车</button>
                            </div>
                        </div>
                        <div id = "details-ri">
                            <p id = "details-ri-top">其他人还看了</p>
                            <ul>
                                <li>
                                    <a href="#"><img src="//eshop.dell-brand.com/uploads/202007/1594261779_4.jpg" alt=""></a>
                                    <p>￥18999</p>
                                    <a href="#">【2020新款】XPS 13(9300) 13.4英寸超轻薄商务笔记本</a>
                                    <span>XPS 13-9300-R1802TS</span>
                                </li>
                                <li>
                                    <a href="#"><img src="//eshop.dell-brand.com/uploads/202007/1594261690_4.jpg" alt=""></a>
                                    <p>￥23299</p>
                                    <a href="#">【2020新款】XPS 15(9500) 15.6英寸超轻薄全面屏设计轻薄本</a>
                                    <span>XPS 15-9500-R1945TS</span>
                                </li>
                                <li>
                                    <a href="#"><img src="//eshop.dell-brand.com/uploads/202007/1594259866_4.jpg" alt=""></a>
                                    <p>￥26499</p>
                                    <a href="#">【2020新款】XPS 17(9700) 17英寸超轻薄全面屏设计轻薄本</a>
                                    <span>XPS 17-9700-R1868TS</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                
                    `
                }
            }
            details.html(str);
        })
		}
		   //存储本地信息1
			 function cookie1(){
				var allnum = 1;
				//立即购买
				$("#details").on("click",".details-cen-btn-shopping",function(){})
				//加入购物车
        $("#details").on("click",".details-cen-btn-cart",function(){
            $.get("../data/data.json",function(arr){
								var first = $.cookie("notebook") == null ? true : false;
								var datacook = JSON.parse($.cookie("productdata"));
								var id = datacook;
                if(first){
                    var data = [{id:id,num:allnum}];
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
                        var obj = {id:id,num:allnum};
                        //将数据插入到数据中
                        cookieArr.push(obj);
                    }
                    $.cookie("notebook",JSON.stringify(cookieArr),{expires:7});
                }
            })
						alert("商品添加成功");
				})
				//加减商品
        $("#details").on("click",".details-cen-count-subtract",function(){
					var num = $(".details-cen-count-number");
            $.get("../data/data.json",function(arr){
                var cookieArr =  JSON.parse($.cookie("notebook"))
								var datacook = JSON.parse($.cookie("productdata"));
								var id = datacook;
                for(var k = 0;k < cookieArr.length; k++){
                    if(cookieArr[k].id == id){
                        cookieArr[k].num--;
                        if(cookieArr[k].num <= 1){
														cookieArr[k].num = 1;
                        }
                    }
								}
                $.cookie("notebook",JSON.stringify(cookieArr),{expires:7});
            })
            allnum--
            if(num.html() == 1){
                alert("最后一件了不能再减了");
                allnum = 1;
            }
            num.html(allnum);
        })
        $("#details").on("click",".details-cen-count-plus",function(){
					var num = $(".details-cen-count-number");
            $.get("../data/data.json",function(arr){
                var cookieArr =  JSON.parse($.cookie("notebook"))
                var datacook = JSON.parse($.cookie("productdata"));
								var id = datacook;
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
    return {
        fade:fade,
        selectCard:selectCard,
        sidewindow:sidewindow,
        changeLevel:changeLevel,
        bigglass:bigglass,
        allocation:allocation,
        help:help,
        pay:pay,
        homedata:homedata,
				allproducts:allproducts,
				cookie1:cookie1,
    }
})