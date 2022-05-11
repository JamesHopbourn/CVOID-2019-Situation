window.onload=function(){
    
    var oinput = document.getElementsByTagName("input");
    var btn = document.getElementById("btn_search");


    //载入页面后显示表格
    $.ajax({
        method:"GET",
        url:"http://localhost:8089/api/today",
        success:function(result){
            var list = result['data'];
            var len = list.length;
            var html=[];
            //全国统计
            //省份数据
            for(var i = 0 ; i<len ; i ++){
                    html.push("<tr><td>"+list[i]["provinceName"]+"</td>");
                    html.push("<td>"+list[i]["currentConfirmedCount"]+"</td>");
                    html.push("<td>"+list[i]["confirmedCount"]+"</td>");
                    html.push("<td>"+list[i]["deadCount"]+"</td>");
                    html.push("<td>"+list[i]["curedCount"]+"</td></tr>");
            }
            $("#table_2").append(html.join(""));
        },
        error:function(){
            alert("似乎除了些问题，请稍后再试")
        }
    })

    // //省份搜索
    // btn.onclick=function(){
    //     if(!oinput[0].value){
    //         alert("输入不能为空");
    //     }else{
    //         $.ajax({
    //             method:"GET",
    //             url:"/api/PROVIDE?name=" + name,
    //             success:function(result){
    //                 alert("输入成功")
    //             },
    //             error:function(){
    //                 alert("无效的输入值");
    //             }
                
    //         })
    //     }
    // }

}