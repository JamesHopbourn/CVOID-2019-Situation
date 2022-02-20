import re
import json
import requests

resp = requests.get('https://ncov.dxy.cn/ncovh5/view/pneumonia', verify=False)
data = re.findall(r'(?<=window.getAreaStat =).*?(?=}catch)', str(resp.content,'utf-8') )
data = json.loads(data[0])
print((data))