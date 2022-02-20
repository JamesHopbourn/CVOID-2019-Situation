#### 项目设计
系统为用户提供一个COVID-19疫情数据和分析结果的平台，系统采用python语言作为数据抓取以及数据处理工具、采用Java作为Web服务端开发技术，采用微信小程序作为客户端展示技术。

- 数据抓取：Python + requests
- 数据处理：Pyhton + pymysql
- 网页技术：Java + tomcat + HTML + CSS
- 监控页面：Grafana
- 移动展示：微信小程序（因为不支持个人上线医疗类小程序，可以本地部署配置内网穿透，以测试模式访问演示）

#### API 设计
- /api/overall
- /api/provinceName
- /api/area
- /api/news

#### 精选教程
[Java Servlet Tutorial - How to Install Tomcat 8 (on Windows, Mac OS and Ubuntu) and Get Started with Java Servlet Programming](https://www3.ntu.edu.sg/home/ehchua/programming/howto/Tomcat_HowTo.html)  
[Java Tutorial - An Introduction to Java Database Programming (JDBC) by Examples with MySQL](https://www3.ntu.edu.sg/home/ehchua/programming/java/JDBC_Basic.html)  

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

#### requests乱码解决
[怎么解决python中的request中文乱码 - 编程语言 - 亿速云](https://www.yisu.com/zixun/224414.html)  
