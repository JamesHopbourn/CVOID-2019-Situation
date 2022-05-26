window.onload = function () {
    var total;
    var page_num = 1;
    var btn_up = document.getElementById("btn_up");
    var btn_down = document.getElementById("btn_down");
    var name = new URLSearchParams(window.location.search).get('name');

    document.title = name + "历史疫情数据";
    $("#province_name").append(name + "历史疫情数据");

    // 全局错误处理
    $(document).ajaxError(function (event, request, settings) {
        // 定义不同类型的错误
        mapper = {
            "404": "文件没有找到",
            "500": "服务器错误"
        }
        alert(`请求地址：${settings.url}\n` +
            `错误信息：${mapper[request.status]}`);
    });

    //加载完成后显示表格
    $.ajax({
        method: "GET",
        url: `/api/province?page=1&pageSize=10&name=${name}`,
        async: false,
        success: (result) => {
            total = Math.ceil(result['data']['total'] / 10);;
            Print_search(result);
        },
        error: () => {
            alert("似乎出了些问题，请稍后再试")
        }
    })

    //跳转上一页
    btn_up.onclick = () => {
        if (page_num > 1) {
            page_num--;
            $.getJSON(`/api/province?page=${page_num}&pageSize=10&name=${name}`, (result) => {
                Delete()//清空
                Print_search(result);//打印
            })
        } else {
            alert("没有上一页了")
        }
    }

    //跳转下一页
    btn_down.onclick = () => {
        if (page_num < total) {
            page_num++;
            $.getJSON(`/api/province?page=${page_num}&pageSize=10&name=${name}`, (result) => {
                Delete()//清空
                Print_search(result);//打印
            })
        } else {
            alert("没有下一页了")
        }
    }
}