#### 项目设计
系统为用户提供一个 COVID19 疫情数据和分析结果的平台，系统采用 Python 语言作为数据抓取以及数据处理工具、采用 Java 作为 Web 服务端开发技术，采用微信小程序作为客户端展示技术。
- 数据抓取：Python + requests
- 数据存储：GitHub repository
- 网页技术：Java + tomcat + HTML + CSS
- 移动展示：微信小程序（因为不支持个人上线医疗类小程序，可以本地部署配置内网穿透，以测试模式访问演示）

#### MySQL 数据库表头
|日期|省份|确诊人数|死亡|治愈|
|:-:|:-:|:-:|:-:|:-:|

#### API 设计
- /api/overall
- /api/provinceName
- /api/area
- /api/news
- /api/date

小组成员：陈志烨、陈旭、何妙宏
