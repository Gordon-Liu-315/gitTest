require.config({
    paths:{
        jquery:"jquery-1.11.3",
        "jquery-cookie":"jquery.cookie",
        home:"home_page",
        details1:"product_details_page1",
        shopping:"shopping_cart",
        details:"product_details_page",
    },
    shim:{
        "jquery-cookie":["jquery"],
    }
})
require(["home","details1","shopping","details"],function(home,details1,shopping,details){
    home.fade();
    home.selectCard();
    home.slideshow();
    home.sidewindow();
    home.homedata();
    home.homeproducts();
    home.dragslider();
    home.phone();
    home.loginbtn();
    home.registerdata();
    home.logindata();
    home.allProducts();

    // details1.fade();
    // details1.selectCard();
    // details1.sidewindow();
    // details1.changeLevel();
    // details1.bigglass();
    // details1.allocation();
    // details1.pay();
    // details1.help();
    // details1.homedata();
    // details1.cookie1();

    shopping.fade();
    shopping.selectCard();
    shopping.sidewindow();
    shopping.homedata();
    shopping.shopping();

    details.fade();
    details.selectCard();
    details.sidewindow();
    details.changeLevel();
    details.bigglass();
    details.allocation();
    details.pay();
    details.help();
    details.homedata();
    details.allproducts();
    details.cookie1();

})

