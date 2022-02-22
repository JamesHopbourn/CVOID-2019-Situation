import re
import json
import pymysql
import requests
from urllib3 import *
from datetime import date
from configparser import ConfigParser

disable_warnings()

resp = requests.get("https://ncov.dxy.cn/ncovh5/view/pneumonia", verify=False)
data = re.findall(r"(?<=window.getAreaStat =).*?(?=}catch)", str(resp.content, "utf-8"))
data = json.loads(data[0])

config = ConfigParser()
config.read("database.conf")
config = config["database"]
db = pymysql.connect(
    host=config["host"],
    user=config["user"],
    password=config["password"],
    database=config["database"],
)

cursor = db.cursor()
cursor.execute(
    """CREATE TABLE IF NOT EXISTS detailCount (
	date date NOT NULL,
	provinceName varchar(20) NOT NULL,
	currentConfirmedCount int(10) NOT NULL,
	confirmedCount int(10) NOT NULL,
	deadCount int(10) NOT NULL,
	curedCount int(10) NOT NULL)"""
)

for i in range(len(data)):
    cursor.execute(
        "INSERT INTO detailCount (date, provinceName, currentConfirmedCount, confirmedCount, deadCount, curedCount) VALUES (%s, %s, %s, %s, %s, %s)",
        (
            date.today(),
            data[i]["provinceName"],
            data[i]["currentConfirmedCount"],
            data[i]["confirmedCount"],
            data[i]["deadCount"],
            data[i]["curedCount"],
        ),
    )
db.commit()
db.close()

