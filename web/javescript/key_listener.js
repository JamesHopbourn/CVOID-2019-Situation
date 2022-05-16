window.onload=function(){
    $(".input").keydown(function (event) {
        if (event.keyCode == 13) {
            searchProvice();
        }
    });
    
}