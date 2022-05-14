window.onload=function(){

    //监听回车按键，按下后搜索
    $(".input").keydown(function (event) {
        if (event.keyCode == 13) {
            searchProvice();
        }
    });
    
}