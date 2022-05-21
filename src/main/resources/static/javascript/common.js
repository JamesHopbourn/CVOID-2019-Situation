document.getElementById("app-header").innerHTML = `
    <div>
        <ul>
            <li><a class="a1" href="index.html">首页</a></li>
            <li class="rightBar"><a class="a2" href="knowledge.html">防疫科学小知识</a></li>
            <li class="rightBar"><a class="a3" href="notice.html">疫苗接种注意事项</a></li>
            <li class="rightBar"><a class="a3" href="https://github.com/JamesHopbourn/CVOID-2019-Situation">GitHub 项目仓库</a></li>
        </ul>
    </div>
`;

document.getElementById("app-footer").innerHTML = `
    <div class="footer">
        Copyright © 2022 孤电子队 版权所有<br>
        胡金栋、林钰婷、陈志烨、陈旭、何妙宏
    </div>
`;

//清空表格
function Delete() {
    if (tbody_search !== "undefined") {
        while (tbody_search.hasChildNodes()) {
            tbody_search.removeChild(tbody_search.lastChild)
        }
    }
}

//打印表格
function Print_search(result) {
    var list = result['data']['records'];
    var len = list.length;
    var html = [];
    for (var i = 0; i < len; i++) {
        html.push("<tr><td class='data'>" + list[i]["date"] + "</td>");
        html.push("<td>" + list[i]["currentConfirmedCount"] + "</td>");
        html.push("<td>" + list[i]["confirmedCount"] + "</td>");
        html.push("<td>" + list[i]["deadCount"] + "</td>");
        html.push("<td>" + list[i]["curedCount"] + "</td></tr>");
    }
    $("#tbody_search").append(html.join(""));
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
