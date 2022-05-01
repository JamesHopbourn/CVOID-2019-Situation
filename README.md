#### 项目设计
系统为用户提供一个COVID-19疫情数据和分析结果的平台，系统采用python语言作为数据抓取以及数据处理工具、采用Java作为Web服务端开发技术，采用微信小程序作为客户端展示技术。
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

#### 所需软件
- pip3 install -U pymysql
- pip3 install -U requests
- pip3 install -U uvicorn
- pip3 install -U fastapi
- pip3 install -U mysql-connector-python
- pip3 install -U pipreqs
- brew install mysql@5.7
- brew install maven
- brew install poetry
- mysql-connector-java-8.0.28

- [Download IntelliJ IDEA: The Capable & Ergonomic Java IDE by JetBrains](https://www.jetbrains.com/idea/download/#section=mac)
