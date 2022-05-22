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
                table_body.removeChild(table_body.lastChild)
            }
        }
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

