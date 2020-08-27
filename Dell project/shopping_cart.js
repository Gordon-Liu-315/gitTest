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
        //购物车商品
        function shopping(){
						var cookieStr = $.cookie("notebook");
						if(!cookieStr){
								$("#nullproduct").css("display","block");
						}else{
							$("#nullproduct").css("display","none");
						}
						produc();
						//给页面加数据
						function produc(){
							//判断是否有商品
							var cookieStr = $.cookie("notebook");
							if(!cookieStr){
								return;
							}
							$.get("../data/data.json",function(arr){
								var cookieArr = JSON.parse(cookieStr);
								var newArr = [];
								for(var i = 0; i < cookieArr.length; i++){
									for(var j = 0; j < arr.length; j++){
										if(arr[j].id == cookieArr[i].id){
											arr[j].num = cookieArr[i].num;
											newArr.push(arr[j]);
											break;
										}
									}
								}
								if(!newArr){
									$("#nullproduct").css("display","block");
								}
								var str = ``;
								for(var k = 0; k < newArr.length; k++){
									str += 
									`
									<ul id = "products-con-ul">
										<li><input class="products-con-ul-inp" type="checkbox" id = "${newArr[k].id}"><a href=""><img src="${newArr[k].img}" alt=""></a></li>
										<li><a href=""> ${newArr[k].style}</a></li>
										<li>${newArr[k].type}</li>
										<li><button class="products-con-ul-sub">-</button><p class="products-con-ul-p">${newArr[k].num}</p><button class="products-con-ul-plus">+</button></li>
										<li><p class = "products-con-ul-mon">${newArr[k].oldprice}</p><p>折扣:</p></li>
										<li><p class = "products-con-ul-mon">${newArr[k].oldprice}</p><p>${Math.abs(newArr[k].newprice - newArr[k].oldprice)}</p></li>
										<li><b class = "products-con-ul-remove">删除</b></li>
									</ul>
									<h3>小计：<span>${newArr[k].newprice * newArr[k].num}</span></h2>
									`
								}
								$("#products-con").html(str);

								//总金额合计
								var allmoney = $("#money h2 span");
								var allinp = $("#products-con").find(".products-con-ul-inp");		
								var allnum = 0;	
								//全选					
								$("#money").on("click","#money-allbtn",function(){
									allnum = 0;
									for(var l = 0; l < newArr.length; l++){
										 allnum += newArr[l].num * newArr[l].newprice;
									}
									allmoney.html(allnum);
									for(var m = 0; m < allinp.length; m++){
										allinp[m].checked = true;
									}
								});
								//全不选
								$("#money").on("click","#money-notallbtn",function(){
									for(var m = 0; m < allinp.length; m++){
										allinp[m].checked = false;
									}
									allmoney.html(0);
								})
								//单选
								$("#products-con").on("click","input",function(){
									allnum = 0;
									for(var n = 0; n < allinp.length; n++){
										for(var p = 0; p < newArr.length; p++){
											if(allinp[n].checked && allinp[n].id == newArr[p].id){
												allnum += newArr[p].num * newArr[p].newprice;
											}
									  }
									}
									allmoney.html(allnum);
								})
							})
						}
						//加减数量
						$("#products-con").on("click","button",function(){
							var cookieArr = JSON.parse($.cookie("notebook"));
							var id = $(this).parentsUntil("#products-con-ul").prevAll().find(".products-con-ul-inp").attr("id");
							var index = cookieArr.findIndex(item => item.id == id);
							console.log(index)
							if(this.innerHTML == "+"){
                cookieArr[index].num++;
							}
							if(this.innerHTML == "-"){
									cookieArr[index].num == 1 ? alert("!已是最后一件商品") : cookieArr[index].num--;
							}
							$(this).siblings(".products-con-ul-p").html(cookieArr[index].num);
							$.cookie("notebook",JSON.stringify(cookieArr),{expires:7});
							produc();
						})
					//删除商品
					$("#products-con").on("click","b",function(){
						var cookieArr = JSON.parse($.cookie("notebook"));
						var id = $(this).parentsUntil("#products-con-ul").prevAll().find(".products-con-ul-inp").remove().attr("id");
						var index = cookieArr.findIndex(item => item.id == id);
						cookieArr.splice(index,1);
						if(cookieArr.length){	
							$.cookie("notebook",JSON.stringify(cookieArr),{expires:7});
						}else{
							$.cookie("notebook",null);
						}
						produc();
					})
        }
        return {
            fade:fade,
            selectCard:selectCard,
            sidewindow:sidewindow,
            homedata:homedata,
            shopping:shopping,
        }
})