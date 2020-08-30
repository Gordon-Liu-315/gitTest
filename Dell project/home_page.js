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
    //轮播图
    function slideshow(){
        var ul = $("#banner-ul-img");
        var imgs = $("#banner-ul-img li");
        var lis = $("#banner-ul-point li");
        var inow = 0;
        var timer = null;
        $("#banner")
            .mouseenter(function(){
                clearInterval(timer);
            })
            .mouseleave(function(){
                timer = setInterval(function(){
                    inow++;
                    move();
                },5000);
						})
						timer = setInterval(function(){
								inow++;
								move();
						},5000);
					lis.click(function(){
							inow = $(this).index();
							move();
					})
        function move(){
            lis.removeClass("banner-ul-point-active").eq(inow).addClass("banner-ul-point-active");
            if(inow == lis.size()){
                lis.eq(0).addClass("banner-ul-point-active");
            }
            ul.animate({left:-1920 * inow},500,function(){
                if(inow == lis.size()){
                    inow = 0;
                    ul.css("left",0);
                }
            })
        }
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
	//首页数据
	function homeproducts(){
			$.get("../data/data.json",function(arr){
				var str = ``;
				for(var i = 0; i < arr.length; i++){
					if(i < 28){
						str +=
					`
				<div id = "product-zone">
					<a href="#" id = "product-zone-a"><img src="${arr[i].img}" alt=""></a>
					<p>${arr[i].name}</p>
					<b>${arr[i].style}</b>
					<span>ins 15-7500-R2645B</span>
					<span>${arr[i].type}</span>
					<div>
						<p><del>￥${arr[i].oldprice}</del></p>
						<p>￥${arr[i].newprice}</p>
						<a href="#" class="buttonDetails" id = "${arr[i].id}">立即购买</a>
					</div>
				</div>
					`
					}
					if(i >= 28 && i < 40){
						str +=
						`
						<div id = "displayZone">
							<a href="#" id = "displayZone-a"><img src="${arr[i].img}" alt=""></a>
							<b>${arr[i].name}</b>
							<div>
								<p><del>￥${arr[i].oldprice}</del></p>
								<p>￥${arr[i].newprice}</p>
								<a href="#" class="buttonDetails" id="${arr[i].id}">立即购买</a>
							</div>
						</div>
						`
					}
					if((i + 1) / 4 == 1){
						str +=
						`
						<a href="#" id = "newZone-center-img"><img src="images/hotZone.png" alt=""></a>
						`
					}
					if((i + 1) / 12 == 1){
						str +=
						`
						<a href="#" id = "newZone-center-img"><img src="images/XPSZone.png" alt=""></a>
						`
					}
					if((i + 1) / 16 == 1){
						str +=
						`
						<a href="#" id = "newZone-center-img"><img src="images/gameZone.png" alt=""></a>
						`
					}
					if((i + 1) / 20 == 1){
						str +=
						`
						<a href="#" id = "newZone-center-img"><img src="images/UItrabookZone.png" alt=""></a>
						`
					}
					if((i + 1) / 24 == 1){
						str +=
						`
						<a href="#" id = "newZone-center-img"><img src="images/ETZone.png" alt=""></a>
						`
					}
					if((i + 1) / 28 == 1){
						str +=
						`
						<a href="#" id = "newZone-center-img"><img src="images/displayZone.png" alt=""></a>
						`
					}
					if((i + 1) / 32 == 1){
						str +=
						`
						<a href="#" id = "newZone-center-img"><img src="images/partsZone.png" alt=""></a>
						`
					}
				}
				$("#product").html(str);
				
			})
	}
	//登录滑块拖动
	function dragslider(){
		var box = $(".register-login-login-block");
		var icon1 = $(".register-login-login-block-start");
		var icon2 = $(".register-login-login-block-end");
		var green= $("#register-login-login-block-green");
		var block = $(".register-login-login-block-block");
		var span = box.find("span");
		var verify = $(".register-login-login-yard-verify");
		verify.attr("disabled",true)
		block.on("mousedown",function(ev){
			var offsetX = ev.clientX - block.offset().left;
			$(document).on("mousemove",function(ev){
				var l = ev.clientX - offsetX - box.offset().left;
				l = Math.min(254,l);
        l = Math.max(0, l);
				block.css({
					left:l
				});
				green.css({
					width:l
				})
			})
			$(document).on("mouseup",function(){
				
				$(document).off("mousemove");
				var l = parseInt(block.css("left"));
				console.log(l)
				if(l < 250){
					block.stop(true).animate({"left":0},500)
					green.stop(true).animate({"width":0},500)
					span.html("请按住滑块，拖至最右边");
					verify.attr("disabled",true);
				}
				if(l >= 250){
					icon1.css("display","none");
					icon2.css("display","block");
					block.stop(true).animate({"left":254},500)
					green.stop(true).animate({"width":254},500)
					span.html("验证中...")
					setTimeout(function(){
						span.html("验证通过");
					},2000)
					$(document).off("mouseup")
					verify.attr("disabled",false)
				}else{
					icon1.css("display","block");
					icon2.css("display","none");
				}
				
			})
		})
	}
	//手机号正则验证
	function phone(){
		var inp = $(".register-login-login-phone");
		var str = $("#register-login-login-string");
		var regexp = /^[1][3,4,5,7,8][0-9]{9}$/;
		inp.on("focus",function(){
			str.css("display","none")
		})
		inp.on("blur",function(){
			var value = $(".register-login-login-phone").val();
			console.log(value)
			if(regexp.test(value) == false){
				str.css("display","block");
			}else if(regexp.test(value) == true){
				str.css("display","none");
			}
		})

		
	}
	//点击登录各种按钮的跳转
	function loginbtn(){
		var all = $("#register");
		var masking = $("#htmlbody");
		var open = $(".header-top-a");
		var close = $(".register-login-title-icon");
		var phone = $("#register-login-login");
		var phoneP1 = $("#register-login-login-forget-p1");
		var phoneP2 = $("#register-login-login-forget-p2");
		var login = $("#register-logon");
		var loginP1 = $("#register-logon-p1");
		var loginP2 = $("#register-logon-p2");
		var register = $("#register-register");
		var registerP1 = $("#register-register-p1");
		var registerP2 = $("#register-register-p2");
		//打开关闭登录页面
		open.click(function(){
			all.css("display","block");
			masking.css("display","block");
		})
		close.click(function(){
			all.css("display","none");
			masking.css("display","none");
		})
		//手机号登录页面的其他跳转
		phoneP1.click(function(){
			phone.css("display","none");
			login.css("display","flex");
			register.css("display","none");
		})
		phoneP2.click(function(){
			phone.css("display","none");
			login.css("display","none");
			register.css("display","flex");
		})
		//账号登录页面的其他跳转
		loginP1.click(function(){
			phone.css("display","flex");
			login.css("display","none");
			register.css("display","none");
		})
		loginP2.click(function(){
			phone.css("display","none");
			login.css("display","none");
			register.css("display","flex");
		})
		//注册页面的其他跳转
		registerP1.click(function(){
			phone.css("display","flex");
			login.css("display","none");
			register.css("display","none");
		})
		registerP2.click(function(){
			phone.css("display","none");
			login.css("display","flex");
			register.css("display","none");
		})
	}
	//注册提交数据给后台
	function registerdata(){
		var btn = $("#register-register-btn");
		btn.click(function(){
			var inp1 = $("#register-register-inp1").val();
			var inp2 = $("#register-register-inp2").val();
			var inp3 = $("#register-register-inp3").val();
			var span = $("#register-register").find("span");
			$.post("dellregister.php",
			{
				username:inp1,
				password:inp2,
				repassword:inp3,
				createtime:new Date().getTime(),
			},
			function(data){
				var arr = JSON.parse(data);
				if(arr.code){
					span.html(arr.msg);
					span.attr("id","register-register-span1");
					span.css("display","block");
				}else{
					span.html(arr.msg);
					span.attr("id","register-register-span2");
				}
				
			})
		})
	}
	//登录提交数据给后台
	function logindata(){
	
		var btn = $("#register-logon-btn");
		btn.click(function(){
			var inp1 = $("#register-logon-inp1").val();
			var inp2 = $("#register-logon-inp2").val();
			var span = $("#register-logon").find("span");
			$.post("delllogin.php",
			{
				username:inp1,
				password:inp2,
			},function(data){
				var arr = JSON.parse(data);
				if(arr.code){
					span.html(arr.msg);
					span.attr("id","register-logon-span1");
					span.css("display","block");
				}else{
					span.html(arr.msg);
					span.attr("id","register-logon-span2");
					setInterval(function(){
						var all = $("#register");
						var masking = $("#htmlbody");
						masking.css("display","none");
						all.css("display","none");
					},2000);

				}
			})
		})
	}
	//各个商品添加本地存储
	function allProducts(){
		$("#product").on("click",".buttonDetails",function(){
			var btnid = $(this).attr("id");
			$(window).attr("location","../product_details_page.html");
			var body = $("#productBody");
			console.log(body)
			$.get("../data/data.json",function(arr){
				for(let i = 0; i < arr.length; i++){
					if(btnid == arr[i].id){
						$.cookie("productdata",`${arr[i].id}`);
					}
				}
			})
		});
	}
    return {
      fade:fade,
      selectCard:selectCard,
	    slideshow:slideshow,
      sidewindow:sidewindow,
      homedata:homedata,
			homeproducts:homeproducts,
			dragslider:dragslider,
			phone:phone,
			loginbtn:loginbtn,
			registerdata:registerdata,
			logindata:logindata,
			allProducts:allProducts,
    }
})