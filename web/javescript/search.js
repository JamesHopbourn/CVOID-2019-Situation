window.onload=function(){
    const urlParams = new URLSearchParams(window.location.search);
    var name = urlParams.get('name')
    $.ajax({
        method:"GET",
        url:"http://localhost:8089/api/province?page=1&pageSize=10&name="+name,
        success:function(result){
            var list = result['data']['records'];;
            var len = list.length;
            var html=[];
            var html_max=[];
            var html_min=[];
            //省份数据
            for(var i = 0 ; i<len ; i ++){
                html.push("<tr><td>"+list[i]["date"]+"</td>");
                html.push("<td>"+list[i]["currentConfirmedCount"]+"</td>");
                html.push("<td>"+list[i]["confirmedCount"]+"</td>");
                html.push("<td>"+list[i]["deadCount"]+"</td>");
                html.push("<td>"+list[i]["curedCount"]+"</td></tr>");
            }
            $("#table_search").append(html.join(""));
        },
        error:function(){
            alert("似乎出了些问题，请稍后再试")
        }
    })
}