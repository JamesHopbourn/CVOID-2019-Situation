#### 项目设计
系统为用户提供一个COVID-19疫情数据和分析结果的平台，系统采用python语言作为数据抓取以及数据处理工具、采用Java作为Web服务端开发技术，采用微信小程序作为客户端展示技术。
- 数据抓取：Python + requests
- 数据处理：Pyhton + pymysql
- 数据存储：GitHub repository
- 网页技术：Java + tomcat + HTML + CSS
- 监控页面：Grafana
- 移动展示：微信小程序（因为不支持个人上线医疗类小程序，可以本地部署配置内网穿透，以测试模式访问演示）

#### MySQL 数据库表头
|日期|省份|确诊人数|死亡|治愈|
|:-:|:-:|:-:|:-:|:-:|

#### API 设计
- /api/overall
- /api/provinceName
- /api/area
- /api/news
- /api/date

#### 所需软件
- pip3 install -U pymysql
- pip3 install -U requests
- pip3 install -U uvicorn
- pip3 install -U fastapi
- pip3 install -U mysql-connector-python
- pip3 install -U pipreqs
- brew install mysql@5.7
- brew install maven
- brew install poetry
- mysql-connector-java-8.0.28

#### 精选教程
[Java Servlet Tutorial - How to Install Tomcat 8 (on Windows, Mac OS and Ubuntu) and Get Started with Java Servlet Programming](https://www3.ntu.edu.sg/home/ehchua/programming/howto/Tomcat_HowTo.html)  
[Java Tutorial - An Introduction to Java Database Programming (JDBC) by Examples with MySQL](https://www3.ntu.edu.sg/home/ehchua/programming/java/JDBC_Basic.html)  
[How to Create database in MySql using JSP code](https://www.studentstutorial.com/java-project/create-database-in-mysql-using-jsp.php)  

#### 参考项目
[eugeneyan/fastapi-html: Sample repository demonstrating how to use FastAPI to serve HTML web apps.](https://github.com/eugeneyan/fastapi-html)  

#### tomcat 配置路径
```
root path
/opt/homebrew/吃的Cellar/tomcat/10.0.14/libexec/webapps/ROOT

conf path
/opt/homebrew/etc/tomcat

web conf path
/opt/homebrew/etc/tomcat/web.xml

server conf path
/opt/homebrew/etc/tomcat/server.xml
    <param-name>listings</param-name>
    <param-value>true</param-value>

account conf path
/opt/homebrew/etc/tomcat/tomcat-users.xml
```

#### tomcat 相关信息
```
brew info tomcat
tomcat: stable 10.0.14 (bottled)
Implementation of Java Servlet and JavaServer Pages
https://tomcat.apache.org/
/opt/homebrew/Cellar/tomcat/10.0.14 (647 files, 15.4MB) *
  Poured from bottle on 2022-02-20 at 20:30:27
From: https://github.com/Homebrew/homebrew-core/blob/HEAD/Formula/tomcat.rb
License: Apache-2.0
==> Dependencies
Required: openjdk ✔
==> Caveats
Configuration files: /opt/homebrew/etc/tomcat

To restart tomcat after an upgrade:
  brew services restart tomcat
Or, if you don't want/need a background service you can just run:
  /opt/homebrew/opt/tomcat/bin/catalina run
```

#### tomcat 守护进程
```
brew services restart tomcat
==> Tapping homebrew/services
Cloning into '/opt/homebrew/Library/Taps/homebrew/homebrew-services'...
remote: Enumerating objects: 1748, done.
remote: Counting objects: 100% (255/255), done.
remote: Compressing objects: 100% (54/54), done.
remote: Total 1748 (delta 217), reused 201 (delta 201), pack-reused 1493
Receiving objects: 100% (1748/1748), 494.49 KiB | 676.00 KiB/s, done.
Resolving deltas: 100% (772/772), done.
Tapped 1 command (44 files, 633KB).
==> Successfully started `tomcat` (label: homebrew.mxcl.tomcat)
```

#### tomcat 管理面板
```
open http://localhost:8080/
```

#### tomcat 关闭服务
```
telnet 127.0.0.1 8005
SHUTDOWN
```

#### hello 实验项目
```
# webapp path
cd /opt/homebrew/Cellar/tomcat/10.0.14/libexec/webapps

# create hello world project directory
mkdir -p hello/WEB-INF/classes

# directory structure
tree hello
hello
└── WEB-INF
    └── classes

"hello": The is called the context root (or document base directory) of your webapp. You should keep all your HTML files and resources visible to the web users (e.g., HTMLs, CSSs, images, scripts, JSPs) under this context root.
"hello/WEB-INF": This directory, although under the context root, is not visible to the web users. This is where you keep your application's web descriptor file "web.xml".
"hello/WEB-INF/classes": This is where you keep all the Java classes such as servlet class-files.
```
[Java Servlet Tutorial - How to Install Tomcat 8 (on Windows, Mac OS and Ubuntu) and Get Started with Java Servlet Programming](https://www3.ntu.edu.sg/home/ehchua/programming/howto/Tomcat_HowTo.html)  

#### Java config CLASSPATH
```
JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk-17.0.1.jdk/Contents/Home/bin
PATH=$JAVA_HOME/bin:$PATH:.
CLASSPATH=$JAVA_HOME/lib/tools.jar:$JAVA_HOME/lib/dt.jar:.
export JAVA_HOME
export PATH
export CLASSPATH
```

#### tomcat servlet-api.jar include
```
brew list tomcat
/opt/homebrew/Cellar/tomcat/10.0.14/.bottle/etc/ (10 files)
/opt/homebrew/Cellar/tomcat/10.0.14/bin/catalina
/opt/homebrew/Cellar/tomcat/10.0.14/homebrew.mxcl.tomcat.plist
/opt/homebrew/Cellar/tomcat/10.0.14/homebrew.tomcat.service
/opt/homebrew/Cellar/tomcat/10.0.14/libexec/bin/ (18 files)
/opt/homebrew/Cellar/tomcat/10.0.14/libexec/lib/ (33 files)
/opt/homebrew/Cellar/tomcat/10.0.14/libexec/logs/ (3 files)
/opt/homebrew/Cellar/tomcat/10.0.14/libexec/temp/safeToDelete.tmp
/opt/homebrew/Cellar/tomcat/10.0.14/libexec/webapps/ (562 files)
/opt/homebrew/Cellar/tomcat/10.0.14/libexec/work/ (8 files)
/opt/homebrew/Cellar/tomcat/10.0.14/libexec/ (2 files)
/opt/homebrew/Cellar/tomcat/10.0.14/RELEASE-NOTES
/opt/homebrew/Cellar/tomcat/10.0.14/RUNNING.txt

ls /opt/homebrew/Cellar/tomcat/10.0.14/libexec/lib/
annotations-api.jar     jasper.jar        tomcat-i18n-ja.jar
catalina-ant.jar      jaspic-api.jar        tomcat-i18n-ko.jar
catalina-ha.jar       jsp-api.jar       tomcat-i18n-pt-BR.jar
catalina-ssi.jar      servlet-api.jar       tomcat-i18n-ru.jar
catalina-storeconfig.jar    tomcat-api.jar        tomcat-i18n-zh-CN.jar
catalina-tribes.jar     tomcat-coyote.jar     tomcat-jdbc.jar
catalina.jar        tomcat-dbcp.jar       tomcat-jni.jar
ecj-4.20.jar        tomcat-i18n-cs.jar      tomcat-util-scan.jar
el-api.jar        tomcat-i18n-de.jar      tomcat-util.jar
jakartaee-migration-1.0.0-shaded.jar  tomcat-i18n-es.jar      tomcat-websocket.jar
jasper-el.jar       tomcat-i18n-fr.jar      websocket-api.jar

javac -cp .:/opt/homebrew/Cellar/tomcat/10.0.14/libexec/lib/servlet-api.jar HelloServlet.java
```
[Javac无法编译Servlet | Chenyu's Script](https://chenyuzuoo.github.io/posts/23246/)  

#### Access hello sayhello
```
brew services restart tomcat
open 'http://localhost:8080/hello/sayhello'
```

#### Java MySQL database
[Java Tutorial - An Introduction to Java Database Programming (JDBC) by Examples with MySQL](https://www3.ntu.edu.sg/home/ehchua/programming/java/JDBC_Basic.html)  

#### IDEA 添加 tomcat 外部工具

#### tomcat 禁止访问项目目录

#### tomcat 引用 resource css
[html - Attaching a CSS file to a Java Servlet in Tomcat - Stack Overflow](https://stackoverflow.com/questions/23636304/attaching-a-css-file-to-a-java-servlet-in-tomcat)  

#### requests 乱码解决
[怎么解决python中的request中文乱码 - 编程语言 - 亿速云](https://www.yisu.com/zixun/224414.html)  

#### mysql-connector-java
[Connect to MySQL using Java JDBC](https://btbaftbp.tistory.com/m/129)  

#### 安装 mysql 5.7
```
brew install mysql@5.7
==> Downloading https://ghcr.io/v2/homebrew/core/mysql/5.7/manifests/5.7.36
######################################################################## 100.0%
==> Downloading https://ghcr.io/v2/homebrew/core/mysql/5.7/blobs/sha256:db78d3c777c2712cf651550932d8cfbc6a0d75557ffe292272201
==> Downloading from https://pkg-containers.githubusercontent.com/ghcr1/blobs/sha256:db78d3c777c2712cf651550932d8cfbc6a0d7555
######################################################################## 100.0%
==> Pouring mysql@5.7--5.7.36.arm64_monterey.bottle.tar.gz
==> /opt/homebrew/Cellar/mysql@5.7/5.7.36/bin/mysqld --initialize-insecure --user=james --basedir=/opt/homebrew/Cellar/mysql@
==> Caveats
We've installed your MySQL database without a root password. To secure it run:
    mysql_secure_installation

MySQL is configured to only allow connections from localhost by default

To connect run:
    mysql -uroot

mysql@5.7 is keg-only, which means it was not symlinked into /opt/homebrew,
because this is an alternate version of another formula.

If you need to have mysql@5.7 first in your PATH, run:
  echo 'export PATH="/opt/homebrew/opt/mysql@5.7/bin:$PATH"' >> ~/.zshrc

For compilers to find mysql@5.7 you may need to set:
  export LDFLAGS="-L/opt/homebrew/opt/mysql@5.7/lib"
  export CPPFLAGS="-I/opt/homebrew/opt/mysql@5.7/include"

For pkg-config to find mysql@5.7 you may need to set:
  export PKG_CONFIG_PATH="/opt/homebrew/opt/mysql@5.7/lib/pkgconfig"


To restart mysql@5.7 after an upgrade:
  brew services restart mysql@5.7
Or, if you don't want/need a background service you can just run:
  /opt/homebrew/opt/mysql@5.7/bin/mysqld_safe --datadir=/opt/homebrew/var/mysql
==> Summary
🍺  /opt/homebrew/Cellar/mysql@5.7/5.7.36: 320 files, 233MB
==> Running `brew cleanup mysql@5.7`...
Disable this behaviour by setting HOMEBREW_NO_INSTALL_CLEANUP.
Hide these hints with HOMEBREW_NO_ENV_HINTS (see `man brew`).
```

#### start mysql
```
brew services start mysql@5.7
==> Successfully started `mysql@5.7` (label: homebrew.mxcl.mysql@5.7)

echo 'export PATH="/opt/homebrew/opt/mysql@5.7/bin:$PATH"' >> ~/.zshrc

mysql_secure_installation
```
[MySQL安全设置命令mysql_secure_installation - Malcolm的博客 | Malcolm Blog](https://mal-suen.github.io/2018/05/27/MySQL%E5%AE%89%E5%85%A8%E8%AE%BE%E7%BD%AE%E5%91%BD%E4%BB%A4mysql_secure_installation/)  

```
mysql -uroot -p
Enter password: james123
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 5
Server version: 5.7.36 Homebrew

Copyright (c) 2000, 2021, Oracle and/or its affiliates.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql> set password for root@localhost = password('james123');
Query OK, 0 rows affected, 1 warning (0.00 sec)

mysql> quit
Bye
```

```
mysql> create database RUNOOB;
Query OK, 1 row affected (0.00 sec)

mysql> use RUNOOB;
Database changed
mysql> CREATE TABLE `websites` (
    ->   `id` int(11) NOT NULL AUTO_INCREMENT,
    ->   `name` char(20) NOT NULL DEFAULT '' COMMENT '站点名称',
    ->   `url` varchar(255) NOT NULL DEFAULT '',
    ->   `alexa` int(11) NOT NULL DEFAULT '0' COMMENT 'Alexa 排名',
    ->   `country` char(10) NOT NULL DEFAULT '' COMMENT '国家',
    ->   PRIMARY KEY (`id`)
    -> ) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
Query OK, 0 rows affected (0.04 sec)

mysql> INSERT INTO `websites` VALUES ('1', 'Google', 'https://www.google.cm/', '1', 'USA'), ('2', '淘宝', 'https://www.taobao.com/', '13', 'CN'), ('3', '菜鸟教程', 'http://www.runoob.com', '5892', ''), ('4', '微博', 'http://weibo.com/', '20', 'CN'), ('5', 'Facebook', 'https://www.facebook.com/', '3', 'USA');
Query OK, 5 rows affected (0.01 sec)
Records: 5  Duplicates: 0  Warnings: 0
```
[Java MySQL 连接 | 菜鸟教程](https://www.runoob.com/java/java-mysql-connect.html)  

#### Java with JSON
[Java 中 JSON 的使用 | 菜鸟教程](https://www.runoob.com/w3cnote/java-json-instro.html)  

#### IDEA Maven create project  
Maven是一个Java项目的管理和构建工具  
Maven使用pom.xml定义项目内容，并使用预设的目录结构；  
在Maven中声明一个依赖项可以自动下载并导入classpath；  
Maven使用groupId，artifactId和version唯一定位一个依赖。  
[Maven介绍 - 廖雪峰的官方网站](https://www.liaoxuefeng.com/wiki/1252599548343744/1309301146648610)  
[idea-如何创建Maven项目？哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1eU4y1M7Jn)  
```
brew install maven
==> Downloading https://ghcr.io/v2/homebrew/core/maven/manifests/3.8.4
Already downloaded: /Users/james/Library/Caches/Homebrew/downloads/fe67ca34776825d1087e90c28238e7e881c893cd76e2df927f186d8ac34aff40--maven-3.8.4.bottle_manifest.json
==> Downloading https://ghcr.io/v2/homebrew/core/maven/blobs/sha256:6e032d44f0fe
Already downloaded: /Users/james/Library/Caches/Homebrew/downloads/a689558139488d079e7befe44f2f7f1560edfee6d2fd882908a7fa8be3f0452e--maven--3.8.4.arm64_monterey.bottle.tar.gz
==> Installing maven
==> Pouring maven--3.8.4.arm64_monterey.bottle.tar.gz
🍺  /opt/homebrew/Cellar/maven/3.8.4: 79 files, 10MB
==> Running `brew cleanup maven`...
Disable this behaviour by setting HOMEBREW_NO_INSTALL_CLEANUP.
Hide these hints with HOMEBREW_NO_ENV_HINTS (see `man brew`).

mvn --version
Apache Maven 3.8.4 (9b656c72d54e5bacbed989b64718c159fe39b537)
Maven home: /opt/homebrew/Cellar/maven/3.8.4/libexec
Java version: 17.0.1, vendor: Homebrew, runtime: /opt/homebrew/Cellar/openjdk/17.0.1_1/libexec/openjdk.jdk/Contents/Home
Default locale: zh_CN_#Hans, platform encoding: UTF-8
OS name: "mac os x", version: "12.0.1", arch: "aarch64", family: "mac" 
```

#### config pom.xml
```
    <dependencies>
        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>fastjson</artifactId>
            <version>1.2.79</version>
        </dependency>
    </dependencies>
```

#### FastAPI HTML
[How to Set Up a HTML App with FastAPI, Jinja, Forms & Templates](https://eugeneyan.com/writing/how-to-set-up-html-app-with-fastapi-jinja-forms-templates/)  

#### pipreqs requirements
```
pip3 install -U pipreqs
Collecting pipreqs
  Downloading pipreqs-0.4.11-py2.py3-none-any.whl (32 kB)
Collecting docopt
  Downloading docopt-0.6.2.tar.gz (25 kB)
  Preparing metadata (setup.py) ... done
Collecting yarg
  Downloading yarg-0.1.9-py2.py3-none-any.whl (19 kB)
Requirement already satisfied: requests in /opt/homebrew/lib/python3.9/site-packages (from yarg->pipreqs) (2.26.0)
Requirement already satisfied: urllib3<1.27,>=1.21.1 in /opt/homebrew/lib/python3.9/site-packages (from requests->yarg->pipreqs) (1.26.7)
Requirement already satisfied: charset-normalizer~=2.0.0 in /opt/homebrew/lib/python3.9/site-packages (from requests->yarg->pipreqs) (2.0.9)
Requirement already satisfied: idna<4,>=2.5 in /opt/homebrew/lib/python3.9/site-packages (from requests->yarg->pipreqs) (3.3)
Requirement already satisfied: certifi>=2017.4.17 in /opt/homebrew/lib/python3.9/site-packages (from requests->yarg->pipreqs) (2021.10.8)
Building wheels for collected packages: docopt
  Building wheel for docopt (setup.py) ... done
  Created wheel for docopt: filename=docopt-0.6.2-py2.py3-none-any.whl size=13724 sha256=1d4695387d7819e54edd943b5bd51e46bcf77ca1463fdfe2e6683e4d7443730f
  Stored in directory: /Users/james/Library/Caches/pip/wheels/70/4a/46/1309fc853b8d395e60bafaf1b6df7845bdd82c95fd59dd8d2b
Successfully built docopt
Installing collected packages: yarg, docopt, pipreqs
Successfully installed docopt-0.6.2 pipreqs-0.4.11 yarg-0.1.9

pipreqs ./
INFO: Successfully saved requirements file in ./requirements.txt
```

#### config file
[configparser --- 配置文件解析器 — Python 3.7.12 文档](https://docs.python.org/zh-cn/3.7/library/configparser.html)

### git
[如何参与Tianchi(天池)项目以及如何贡献代码 - QTCN开发网 - Powered by phpwind](http://www.qtcn.org/bbs/simple/?t53628.html)  
