window.onload = function () {
    var btn_today = document.getElementById("btn_today");
    var btn_count = document.getElementById("btn_count");
    var btn_dead = document.getElementById("btn_dead");
    var btn_cured = document.getElementById("btn_cured");
    var table_body = document.getElementById("tbody_2");
    var count_today = "ASC";//近期确诊，默认降序
    var count_count = "DESC";//确诊总数
    var count_dead = "DESC";//死亡总数
    var count_cured = "DESC";//治愈总数

    //清空表格
    function Delete() {
        if (table_body !== "undefined") {
            while (table_body.hasChildNodes()) {
                table_body.removeChild(table_body.lastChild)
            }
        }
    }

    //降序打印表格
    function Print_DESC(result) {
        var list = result['data'];
        var len = list.length;
        var html = [];
        for (var i = 0; i < len; i++) {
            var link = `/search.html?name=${list[i]["provinceName"]}`
            html.push(`<tr><td id='td_province'><a href='${link}' class="link">` + list[i]["provinceName"] + "</a></td>");
            html.push("<td>" + list[i]["currentConfirmedCount"] + "</td>");
            html.push("<td>" + list[i]["confirmedCount"] + "</td>");
            html.push("<td>" + list[i]["deadCount"] + "</td>");
            html.push("<td>" + list[i]["curedCount"] + "</td></tr>");
        }
        $("#table_2").append(html.join(""));
    }

    //升序打印表格
    function Print_ASC(result) {
        var list = result['data'];
        var html = [];
        for (var i = list.length - 1; i >= 0; i--) {
            var link = `/search.html?name=${list[i]["provinceName"]}`
            html.push(`<tr><td id='td_province'><a href='${link}' class="link">` + list[i]["provinceName"] + "</a></td>");
            html.push("<td>" + list[i]["currentConfirmedCount"] + "</td>");
            html.push("<td>" + list[i]["confirmedCount"] + "</td>");
            html.push("<td>" + list[i]["deadCount"] + "</td>");
            html.push("<td>" + list[i]["curedCount"] + "</td></tr>");
        }
        $("#table_2").append(html.join(""));
    }

    //展示全国数据
    $.ajax({
        method: "GET",
        url: "/api/province?page=1&pageSize=10&name=全国",
        success: (result) => {
            var list = result['data']['records'][0];
            var html = [];
            html.push("<td class='columnColor'>" + "全国" + "</td>");
            html.push("<td>" + list["currentConfirmedCount"] + "</td>");
            html.push("<td>" + list["confirmedCount"] + "</td>");
            html.push("<td>" + list["deadCount"] + "</td>");
            html.push("<td>" + list["curedCount"] + "</td>");
            $("#tbody_nation").append(html.join(""));
        },
        error: () => {
            alert("似乎出了些问题，请稍后再试")
        }
    })

    //展示福建省数据
    $.ajax({
        method: "GET",
        url: "/api/province?page=1&pageSize=10&name=福建省",
        success: (result) => {
            var list = result['data']['records'][0];
            var html = [];
            html.push("<td class='columnColor'>" + "福建省" + "</td>");
            html.push("<td>" + list["currentConfirmedCount"] + "</td>");
            html.push("<td>" + list["confirmedCount"] + "</td>");
            html.push("<td>" + list["deadCount"] + "</td>");
            html.push("<td>" + list["curedCount"] + "</td>");
            $("#tbody_fujian").append(html.join(""));
        },
        error: () => {
            alert("似乎出了些问题，请稍后再试")
        }
    })

    //载入页面后显示表格
    $.ajax({
        method: "GET",
        url: "/api/today",
        success: (result) => {
            Print_DESC(result)//降序打印表格
            var list = result['data'];
            var len = list.length;
            var html = [];
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
        },
        error: () => {
            alert("似乎出了些问题，请稍后再试")
        }
    })

    //根据近期确诊总数降序排序
    btn_today.onclick = () => {
        $.ajax({
            method: "GET",
            url: "/api/today",
            success: (result) => {
                Delete();//清空表格
                if (count_today == "DESC") {//首次点击降序输出
                    Print_DESC(result)//降序打印表格
                    count_today = "ASC";
                } else {//再次点击升序输出
                    Print_ASC(result)//升序打印表格
                    count_today = "DESC";
                }
            },
            error: () => {
                alert("似乎出了些问题，请稍后再试")
            }
        })
    }

    //根据确诊总数降序排序
    btn_count.onclick = () => {
        $.ajax({
            method: "GET",
            url: "/api/count",
            success: (result) => {
                Delete();//清空表格
                if (count_count == "DESC") {//首次点击降序输出
                    Print_DESC(result)//降序打印表格
                    count_count = "ASC";
                } else {//再次点击升序输出
                    Print_ASC(result)//升序打印表格
                    count_count = "DESC";
                }
            },
            error: () => {
                alert("似乎出了些问题，请稍后再试")
            }
        })
    }

    //根据死亡总数降序排序
    btn_dead.onclick = () => {
        $.ajax({
            method: "GET",
            url: "/api/dead",
            success: (result) => {
                Delete();//清空表格
                if (count_dead == "DESC") {//首次点击降序输出
                    Print_DESC(result)//降序打印表格
                    count_dead = "ASC";
                } else {//再次点击升序输出
                    Print_ASC(result)//升序打印表格
                    count_dead = "DESC";
                }
            },
            error: () => {
                alert("似乎出了些问题，请稍后再试")
            }
        })
    }

    //根据近期确诊总数降序排序
    btn_cured.onclick = () => {
        $.ajax({
            method: "GET",
            url: "/api/cured",
            success: (result) => {
                Delete();//清空表格
                if (count_cured == "DESC") {//首次点击降序输出
                    Print_DESC(result)//降序打印表格
                    count_cured = "ASC";
                } else {//再次点击升序输出
                    Print_ASC(result)//升序打印表格
                    count_cured = "DESC";
                }
            },
            error: () => {
                alert("似乎出了些问题，请稍后再试")
            }
        })
    }
}

