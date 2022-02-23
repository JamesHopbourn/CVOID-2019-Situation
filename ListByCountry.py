import re
import json
import pymysql
import requests
from urllib3 import *
from datetime import date
from configparser import ConfigParser

disable_warnings()

resp = requests.get("https://ncov.dxy.cn/ncovh5/view/pneumonia", verify=False)
data = re.findall(r"(?<=window.getListByCountryTypeService2true =).*?(?=}catch)", str(resp.content, "utf-8"))
data = json.loads(data[0])
for i in range(len(data)):
	print(data[i]['provinceName'], data[i]['confirmedCount'])