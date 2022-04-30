import os
import re
import json
import base64
import requests
from urllib3 import *
from datetime import date

disable_warnings()
today = str(date.today())
token = os.environ['token']

resp = requests.get("https://ncov.dxy.cn/ncovh5/view/pneumonia", verify=False)
data = re.findall(r"(?<=window.getAreaStat =).*?(?=}catch)", str(resp.content, "utf-8"))
data = json.loads(data[0])

execute = "INSERT INTO detailCount (date, provinceName, currentConfirmedCount, confirmedCount, deadCount, curedCount) VALUES\n"
for i in range(len(data)):
    execute += str((today,data[i]["provinceName"],data[i]["currentConfirmedCount"],data[i]["confirmedCount"],data[i]["deadCount"],data[i]["curedCount"]))
    execute += ',\n'
    
byte_encoder = base64.b64encode(execute[:-2].encode("utf-8"))
string_encoder = byte_encoder.decode('utf-8')

response = requests.put(
    url=f'https://api.github.com/repos/:owner/:repo/contents/:path/{today}.sql',
    headers={"Authorization": f"token {token}"},
    data=f'{{"message": "Data upload", "content":"{string_encoder}", "committer":{{"name":"NAME","email":"EMAIL"}}}}', verify=False
)
print(response.status_code)