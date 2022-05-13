window.onload=function(){
    const urlParams = new URLSearchParams(window.location.search);
    var name = urlParams.get('name');
    var btn_up = document.getElementById("btn_up");
    var btn_down = document.getElementById("btn_down");
    var page_num = 1;
    var total;

    //清空表格
    function Delete(){
        if (tbody_search!== "undefined") {
            while(tbody_search .hasChildNodes()){
                tbody_search .removeChild(tbody_search .lastChild)
            }
        } 
    }

    //打印表格
    function Print_search(result){
        var list = result['data']['records'];
        var len = list.length;
        var html=[];
        for(var i = 0 ; i<len ; i ++){
            html.push("<tr><td>"+list[i]["date"]+"</td>");
            html.push("<td>"+list[i]["currentConfirmedCount"]+"</td>");
            html.push("<td>"+list[i]["confirmedCount"]+"</td>");
            html.push("<td>"+list[i]["deadCount"]+"</td>");
            html.push("<td>"+list[i]["curedCount"]+"</td></tr>");
        }
        $("#tbody_search").append(html.join(""));
    }

    //加载完成后显示表格
    $.ajax({
        method:"GET",
        url:"http://localhost:8089/api/province?page=1&pageSize=10&name="+name,
        async: false,
        success:function(result){
            total = Math.ceil(result['data']['total']/10);;
            Print_search(result);

        },
        error:function(){
            alert("似乎出了些问题，请稍后再试")
        }
    })
    //跳转上一页
    btn_up.onclick=function(){
        if(page_num > 1){
        page_num=page_num-1;
            $.ajax({
                method:"GET",
                url:"http://localhost:8089/api/province?page="+page_num+"&pageSize=10&name="+name,
                success:function(result){

                    Delete()//清空
                    Print_search(result);//打印

                },
                error:function(){
                    alert("似乎出了些问题，请稍后再试")
                }
            })
        }else{
            alert("没有上一页了")
        }
    }

    //跳转下一页
    btn_down.onclick=function(){
        if(page_num < total){
            page_num=page_num+1;
            $.ajax({
            method:"GET",
            url:"http://localhost:8089/api/province?page="+page_num+"&pageSize=10&name="+name,
            success:function(result){

                Delete()//清空
                Print_search(result);//打印

            },
            error:function(){
                alert("似乎出了些问题，请稍后再试")
            }
        })
        }else{
            alert("没有下一页了")
        }
        
    }

     //监听回车按键，按下后搜索
     $("#input").keydown(function(event){
        if(event.keyCode == 13){
            searchProvice();
        }
    });

}