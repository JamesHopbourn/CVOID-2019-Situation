import os
import re
import json
import base64
import requests
from urllib3 import *
from datetime import date

disable_warnings()

# 常量定义
name = 'James Hopbourn'
email = 'jameshopbourn@gmail.com'
today = str(date.today())
plus_token = os.environ['plus_token']
github_token = os.environ['repo_token']
dataSQLpath = f'https://api.github.com/repos/JamesHopbourn/CVOID-2019-Situation/contents/data.sql'
todaySQLpath = f'https://api.github.com/repos/JamesHopbourn/CVOID-2019-Situation/contents/SQLdata/{today}.sql'

# 丁香医生疫情数据爬虫
resp = requests.get("https://ncov.dxy.cn/ncovh5/view/pneumonia", verify=False)
data = re.findall(r"(?<=window.getAreaStat =).*?(?=}catch)", str(resp.content, "utf-8"))
data = json.loads(data[0])

# 构建 SQL 语句
execute = "INSERT IGNORE INTO detailCount (date, provinceName, currentConfirmedCount, confirmedCount, deadCount, curedCount) VALUES\n"
for i in range(len(data)):
    execute += str((today, data[i]["provinceName"], data[i]["currentConfirmedCount"], data[i]["confirmedCount"],
                    data[i]["deadCount"], data[i]["curedCount"]))
    execute += ',\n'

# 报错推送到微信
def statusCheck(funcName, statusCode):
    if (funcName == '创建文件' and statusCode == 422):
        return
    if (statusCode < 200 or statusCode >= 300):
        content = f'{{"token": "{plus_token}", "title":"出错啦~", "content" : "{funcName}:{statusCode}", "template": "json"}}'
        update = requests.put(url='https://www.pushplus.plus/send',data=content.encode('utf-8'), verify=False)

# 获取 prev dataSQL.sql
get = requests.get(
    url=dataSQLpath,
    headers={"Authorization": f"token {github_token}"}, verify=False
)
statusCheck('获取文件', get.status_code)
prev_sha = json.loads(get.text)['sha']
prev_data = json.loads(get.text)['content']
prev_data = base64.b64decode(prev_data).decode('utf-8')
comb_text = f'{prev_data[:-18]}\n\n{execute[:-2]};\n\nCALL totalSum();'
comb_data = base64.b64encode(comb_text.encode('utf-8')).decode('utf-8')

# 更新 dataSQL.sql
if(today not in prev_data):
    update = requests.put(
        url=dataSQLpath,
        headers={"Authorization": f"token {github_token}"},
        data=f'{{"message": "Data update", "content":"{comb_data}", "sha" : "{prev_sha}",\
        "committer":{{"name":"{name}","email":"{email}"}}}}', verify=False
    )
    statusCheck('更新文件', update.status_code)

# 创建今日数据文件
today_data = base64.b64encode(f"{execute[:-2]};".encode('utf-8')).decode('utf-8')
upload = requests.put(
    url=todaySQLpath,
    headers={"Authorization": f"token {github_token}"},
    data=f'{{"message": "Data upload", "content":"{today_data}", \
    "committer":{{"name":"{name}","email":"{email}"}}}}', verify=False
)
statusCheck('创建文件', upload.status_code)