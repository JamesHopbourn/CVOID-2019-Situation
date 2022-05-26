window.onload = function () {
    let count_today = "ASC";//近期确诊，默认降序
    let count_count = "DESC";//确诊总数
    let count_dead = "DESC";//死亡总数
    let count_cured = "DESC";//治愈总数
    const btn_today = document.getElementById("btn_today");
    const btn_count = document.getElementById("btn_count");
    const btn_dead = document.getElementById("btn_dead");
    const btn_cured = document.getElementById("btn_cured");
    const table_body = document.getElementById("tbody_2");

    //清空表格
    function Delete() {
        if (table_body !== "undefined") {
            while (table_body.hasChildNodes()) {
                table_body.removeChild(table_body.lastChild);
            }
        }
    }

    // 全局错误处理
    $(document).ajaxError(function (event, request, settings) {
        // 定义不同类型的错误
        let mapper = {
            "404": "文件没有找到",
            "500": "服务器错误"
        }
        alert(`请求地址：${settings.url}\n` +
            `错误信息：${mapper[request.status]}`);
    });

    //载入页面后显示表格
    $.getJSON('/api/today', (result) => {
        Print_DESC(result);
        const list = result['data'];
        const len = list.length;
        var html_max = [];
        var html_min = [];

        //确诊最多
        html_max.push("<td class='columnColor'>" + "确诊最多" + "</td>");
        html_max.push("<td>" + list[0]["currentConfirmedCount"] + "</td>");
        html_max.push("<td>" + list[0]["confirmedCount"] + "</td>");
        html_max.push("<td>" + list[0]["deadCount"] + "</td>");
        html_max.push("<td>" + list[0]["curedCount"] + "</td>");
        $("#tbody_max").append(html_max.join(""));

        //确诊最少
        html_min.push("<td class='columnColor'>" + "确诊最少" + "</td>");
        html_min.push("<td>" + list[len - 1]["currentConfirmedCount"] + "</td>");
        html_min.push("<td>" + list[len - 1]["confirmedCount"] + "</td>");
        html_min.push("<td>" + list[len - 1]["deadCount"] + "</td>");
        html_min.push("<td>" + list[len - 1]["curedCount"] + "</td>");
        $("#tbody_min").append(html_min.join(""));
    })


    //展示全国数据
    $.getJSON('/api/province?page=1&pageSize=10&name=全国', (result) => {
        var html = [];
        var list = result['data']['records'][0];
        html.push("<td class='columnColor'>" + "全国" + "</td>");
        html.push("<td>" + list["currentConfirmedCount"] + "</td>");
        html.push("<td>" + list["confirmedCount"] + "</td>");
        html.push("<td>" + list["deadCount"] + "</td>");
        html.push("<td>" + list["curedCount"] + "</td>");
        $("#tbody_nation").append(html.join(""));
    })

    //展示福建省数据
    $.getJSON('/api/province?page=1&pageSize=10&name=福建省', (result) => {
        var html = [];
        var list = result['data']['records'][0];
        html.push("<td class='columnColor'>" + "福建省" + "</td>");
        html.push("<td>" + list["currentConfirmedCount"] + "</td>");
        html.push("<td>" + list["confirmedCount"] + "</td>");
        html.push("<td>" + list["deadCount"] + "</td>");
        html.push("<td>" + list["curedCount"] + "</td>");
        $("#tbody_fujian").append(html.join(""));
    })

    //根据近期确诊总数降序排序
    btn_today.onclick = () => {
        $.getJSON('/api/today', (result) => {
            Delete();
            Print_Order(result, count_today);
            count_today = count_today === "DESC" ? "ASC" : "DESC";
        })
    }

    //根据确诊总数降序排序
    btn_count.onclick = () => {
        $.getJSON('/api/count', (result) => {
            Delete();
            Print_Order(result, count_count);
            count_count = count_count === "DESC" ? "ASC" : "DESC";
        })
    }

    //根据死亡总数降序排序
    btn_dead.onclick = () => {
        $.getJSON('/api/dead', (result) => {
            Delete();
            Print_Order(result, count_dead);
            count_dead = count_dead === "DESC" ? "ASC" : "DESC";
        })
    }

    //根据近期确诊总数降序排序
    btn_cured.onclick = () => {
        $.getJSON('/api/cured', (result) => {
            Delete();
            Print_Order(result, count_cured);
            count_cured = count_cured === "DESC" ? "ASC" : "DESC";
        })
    }
}

