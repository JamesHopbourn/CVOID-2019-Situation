from configparser import ConfigParser

config = ConfigParser()
# 传入读取文件的地址，encoding文件编码格式，中文必须
config.read('database.conf')
print(type(config))

print(config['database']['user'])
