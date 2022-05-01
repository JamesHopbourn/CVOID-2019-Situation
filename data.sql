CREATE DATABASE IF NOT EXISTS CVOID2019;

CREATE TABLE IF NOT EXISTS `detailCount` (
  `date` date NOT NULL,
  `provinceName` varchar(20) NOT NULL,
  `currentConfirmedCount` int(10) NOT NULL,
  `confirmedCount` int(10) NOT NULL,
  `deadCount` int(10) NOT NULL,
  `curedCount` int(10) NOT NULL,
  PRIMARY KEY (`date`,`provinceName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

USE CVOID2019;