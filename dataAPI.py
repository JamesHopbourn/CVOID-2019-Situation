# encoding: utf-8 
import uvicorn
import json
import mysql.connector
from fastapi import FastAPI

app = FastAPI()

config = {
    'user': 'root',
    'password': 'james123',
    'host': 'localhost',
    'port': 3306,
    'database': 'CVOID2019'
}

@app.get('/')
def query():
    conn = mysql.connector.connect(**config)
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM detailCount limit 1")
    data = cursor.fetchone()
    key = ('日期', '省份', '近期确诊', '累计确诊', '死亡人数', '治愈人数')
    result = {}
    for i in range(1, len(data)):
        temp = {str(key[i]):str(data[i])}
        result.update(temp)
    cursor.close()
    return result

@app.get("/date/{date}")
def query(date):
    conn = mysql.connector.connect(**config)
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM detailCount WHERE date = %s", (f'{date}',))
    data = cursor.fetchall()
    print(type(data))
    cursor.close()
    return data

@app.get("/info")
def query():
    conn = mysql.connector.connect(**config)
    cursor = conn.cursor()
    cursor.execute("SELECT date,time FROM last_seen")
    data = cursor.fetchall()
    cursor.close()
    result = {}
    for x in range(len(data)):
        temp = {str(data[x][0]):str(data[x][1])}
        result.update(temp)
    return {"last_seen": result}

if __name__ == '__main__':
    uvicorn.run(app,host="0.0.0.0",port=80)