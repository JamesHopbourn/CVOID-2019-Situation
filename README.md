#### 项目设计
系统为用户提供一个 COVID19 疫情数据和分析结果的平台，系统采用 Python 语言作为数据抓取以及数据处理工具、采用 Java 作为 Web 服务端开发技术，采用网页和微信小程序作为客户端展示技术。

#### 项目技术
- Python 爬虫
  - requests
  - GitHub Workflow CI
- Java 后端
  - Spring Web
  - MyBatis
  - MySQL Driver
  - fastjson
  - lombok
- HTML 前端
  - JQuery
  - Bootstrap
  - Bootstrap Table
- 微信小程序
  - vant-weapp 
  - miniprogram-api-promise

#### 网页基本设计
![](./网页基本设计.png)

#### Java 后端设计流程
1. 连接数据库
2. 创建 entity.Count
3. 创建 dao.CountDAO
4. 创建 web.CountController
5. 创建 Test
6. 创建 Postman 接口测试文件

#### entity.Count
```
public class Count {
  private Integer code;
  private String message;
  private JSONObject data;
}
```

#### 网页接口设计
##### 今日数据总览
```
-- 全国数据
select * from `detailCount` where `provinceName`='全国'
-- 福建省数据
select * from `detailCount` where `provinceName`='福建省' and `date`='今日日期'
-- 确诊最少
SELECT `provincename`          AS '确诊最少',
       `currentconfirmedcount` AS '近期确诊',
       `confirmedcount`        AS '总计确诊',
       `deadcount`             AS '总计死亡',
       `curedcount`            AS '总计治愈'
FROM   `detailcount`
WHERE  `confirmedcount` = (SELECT MIN(`confirmedcount`)
                         FROM   (SELECT `confirmedcount`
                                 FROM   `detailcount`
                                 ORDER  BY `date` DESC
                                 LIMIT  34) AS temp)
LIMIT  1;
-- 确诊最多
SELECT `provincename`          AS '确诊最多',
       `currentconfirmedcount` AS '近期确诊',
       `confirmedcount`        AS '总计确诊',
       `deadcount`             AS '总计死亡',
       `curedcount`            AS '总计治愈'
FROM   `detailcount`
WHERE  `confirmedcount` = (SELECT MAX(`confirmedcount`)
                         FROM   (SELECT `confirmedcount`
                                 FROM   `detailcount`
                                 ORDER  BY `date` DESC
                                 LIMIT  34) AS temp)
LIMIT  1;
GET: /api/provinces
response data: {
  counntry: [],
  FujianProvince: [],
  maxConfirmedCount: []
  minConfirmedCount: []
}
```

#### 指定省份数据
```
select * from `detailCount` where `provinceName`='#{provinceName}'

GET: /api/province
request data: {
  provincename: '',
  page: 0
}
```

##### 全国各省数据
```
select * from `detailCount` where `provinceName` <> '全国' and `date`='今日日期'

GET: /api/today
```

#### API 设计


小组成员：陈志烨、陈旭、何妙宏、林钰婷
