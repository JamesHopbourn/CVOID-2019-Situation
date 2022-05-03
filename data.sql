CREATE DATABASE IF NOT EXISTS CVOID2019;

USE CVOID2019;

CREATE TABLE IF NOT EXISTS `detailCount` (
  `date` date NOT NULL,
  `provinceName` varchar(20) NOT NULL,
  `currentConfirmedCount` int(10) NOT NULL,
  `confirmedCount` int(10) NOT NULL,
  `deadCount` int(10) NOT NULL,
  `curedCount` int(10) NOT NULL,
  PRIMARY KEY (`date`,`provinceName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP PROCEDURE IF EXISTS totalSum;

DELIMITER @@

CREATE PROCEDURE totalSum()
BEGIN
  INSERT IGNORE INTO detailCount (`date`, `provinceName`, `currentConfirmedCount`, `confirmedCount`, `deadCount`, `curedCount`) 
  VALUES 
    ('1970-01-01', '全国', '', '', '', '');

  SET @totalDeadCount=(SELECT SUM(`deadCount`) FROM `detailCount`);
  SET @totalCuredCount=(SELECT SUM(`curedCount`) FROM `detailCount`);
  SET @totalConfirmedCount=(SELECT SUM(`confirmedCount`) FROM `detailCount`);
  SET @totalCurrentConfirmedCount=(SELECT SUM(`currentConfirmedCount`) FROM `detailCount`);

  UPDATE 
    detailCount 
  SET 
    deadCount = @totalDeadCount, 
    curedCount = @totalCuredCount, 
    confirmedCount = @totalConfirmedCount, 
    currentConfirmedCount = @totalCurrentConfirmedCount 
  WHERE 
    `date` = '1970-01-01' 
    AND `provinceName` = '全国';

  -- 全国疫情统计
  SELECT `date`                  AS '日期', 
         `provincename`          AS '省份', 
         `currentconfirmedcount` AS '近期确诊', 
         `confirmedcount`        AS '确诊人数', 
         `deadcount`             AS '总计死亡', 
         `curedcount`            AS '总计治愈' 
  FROM   `detailcount` 
  WHERE  `provincename` = '全国'; 

  -- 福建省近10天疫情情况
  SELECT `date`                  AS '日期', 
         `provincename`          AS '省份', 
         `currentconfirmedcount` AS '近期确诊', 
         `confirmedcount`        AS '确诊人数', 
         `deadcount`             AS '总计死亡', 
         `curedcount`            AS '总计治愈' 
  FROM   `detailcount` 
  WHERE  `provincename` = '福建省' 
  LIMIT  10;

  -- 确诊最多 
  SELECT `provincename`          AS '确诊最多', 
         `currentconfirmedcount` AS '近期确诊', 
         `confirmedcount`        AS '确诊人数', 
         `deadcount`             AS '总计死亡', 
         `curedcount`            AS '总计治愈' 
  FROM   detailcount 
  WHERE  confirmedcount = (SELECT MAX(confirmedcount) 
                           FROM   (SELECT confirmedcount
                                   FROM   `detailcount` 
                                   ORDER  BY `date` DESC 
                                   LIMIT  34) AS temp) 
  LIMIT  1; 

  -- 确诊最少 
  SELECT `provincename`          AS '确诊最少', 
         `currentconfirmedcount` AS '近期确诊', 
         `confirmedcount`        AS '确诊人数', 
         `deadcount`             AS '总计死亡', 
         `curedcount`            AS '总计治愈' 
  FROM   detailcount 
  WHERE  confirmedcount = (SELECT MIN(confirmedcount) 
                           FROM   (SELECT confirmedcount
                                   FROM   `detailcount` 
                                   ORDER  BY `date` DESC 
                                   LIMIT  34) AS temp) 
  LIMIT  1;
END@@

DELIMITER ;

INSERT IGNORE INTO detailCount (date, provinceName, currentConfirmedCount, confirmedCount, deadCount, curedCount) VALUES
('2022-05-01', '香港', 261858, 330670, 9308, 59504),
('2022-05-01', '台湾', 118388, 132995, 865, 13742),
('2022-05-01', '上海市', 20265, 58341, 429, 37647),
('2022-05-01', '吉林省', 1420, 40211, 5, 38786),
('2022-05-01', '浙江省', 804, 3109, 1, 2304),
('2022-05-01', '北京市', 319, 2155, 9, 1827),
('2022-05-01', '黑龙江省', 283, 2943, 13, 2647),
('2022-05-01', '江西省', 256, 1369, 1, 1112),
('2022-05-01', '广东省', 184, 7054, 8, 6862),
('2022-05-01', '山东省', 67, 2717, 7, 2643),
('2022-05-01', '四川省', 67, 2049, 3, 1979),
('2022-05-01', '内蒙古自治区', 59, 1750, 1, 1690),
('2022-05-01', '福建省', 51, 3019, 1, 2967),
('2022-05-01', '江苏省', 45, 2203, 0, 2158),
('2022-05-01', '河南省', 40, 2906, 22, 2844),
('2022-05-01', '辽宁省', 35, 1645, 2, 1608),
('2022-05-01', '湖南省', 35, 1385, 4, 1346),
('2022-05-01', '山西省', 34, 418, 0, 384),
('2022-05-01', '云南省', 30, 2119, 2, 2087),
('2022-05-01', '青海省', 29, 95, 0, 66),
('2022-05-01', '海南省', 26, 288, 6, 256),
('2022-05-01', '广西壮族自治区', 20, 1584, 2, 1562),
('2022-05-01', '河北省', 18, 1998, 7, 1973),
('2022-05-01', '安徽省', 8, 1065, 6, 1051),
('2022-05-01', '新疆维吾尔自治区', 6, 1005, 3, 996),
('2022-05-01', '湖北省', 4, 68398, 4512, 63882),
('2022-05-01', '陕西省', 4, 3277, 3, 3270),
('2022-05-01', '重庆市', 4, 698, 6, 688),
('2022-05-01', '天津市', 1, 1803, 3, 1799),
('2022-05-01', '甘肃省', 0, 681, 2, 679),
('2022-05-01', '贵州省', 0, 179, 2, 177),
('2022-05-01', '宁夏回族自治区', 0, 122, 0, 122),
('2022-05-01', '澳门', 0, 82, 0, 82),
('2022-05-01', '西藏自治区', 0, 1, 0, 1);

INSERT IGNORE INTO detailCount (date, provinceName, currentConfirmedCount, confirmedCount, deadCount, curedCount) VALUES
('2022-05-02', '香港', 261751, 330725, 9313, 59661),
('2022-05-02', '台湾', 136198, 150808, 868, 13742),
('2022-05-02', '上海市', 16716, 59070, 461, 41893),
('2022-05-02', '吉林省', 1209, 40242, 5, 39028),
('2022-05-02', '浙江省', 793, 3111, 1, 2317),
('2022-05-02', '北京市', 345, 2191, 9, 1837),
('2022-05-02', '黑龙江省', 247, 2952, 13, 2692),
('2022-05-02', '江西省', 233, 1371, 1, 1137),
('2022-05-02', '广东省', 180, 7082, 8, 6894),
('2022-05-02', '四川省', 70, 2057, 3, 1984),
('2022-05-02', '山东省', 68, 2722, 7, 2647),
('2022-05-02', '内蒙古自治区', 59, 1751, 1, 1691),
('2022-05-02', '福建省', 47, 3022, 1, 2974),
('2022-05-02', '江苏省', 43, 2206, 0, 2163),
('2022-05-02', '河南省', 39, 2907, 22, 2846),
('2022-05-02', '辽宁省', 36, 1646, 2, 1608),
('2022-05-02', '山西省', 29, 418, 0, 389),
('2022-05-02', '云南省', 28, 2119, 2, 2089),
('2022-05-02', '湖南省', 28, 1385, 4, 1353),
('2022-05-02', '海南省', 26, 288, 6, 256),
('2022-05-02', '青海省', 25, 95, 0, 70),
('2022-05-02', '广西壮族自治区', 21, 1587, 2, 1564),
('2022-05-02', '河北省', 14, 1998, 7, 1977),
('2022-05-02', '新疆维吾尔自治区', 8, 1007, 3, 996),
('2022-05-02', '安徽省', 7, 1065, 6, 1052),
('2022-05-02', '湖北省', 4, 68398, 4512, 63882),
('2022-05-02', '重庆市', 4, 698, 6, 688),
('2022-05-02', '天津市', 2, 1804, 3, 1799),
('2022-05-02', '陕西省', 1, 3277, 3, 3273),
('2022-05-02', '甘肃省', 0, 681, 2, 679),
('2022-05-02', '贵州省', 0, 179, 2, 177),
('2022-05-02', '宁夏回族自治区', 0, 122, 0, 122),
('2022-05-02', '澳门', 0, 82, 0, 82),
('2022-05-02', '西藏自治区', 0, 1, 0, 1);

CALL totalSum();