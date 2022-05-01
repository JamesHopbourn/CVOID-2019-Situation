#### 下载软件
[Git - Downloads](https://git-scm.com/downloads)  
[Sublime Text - Text Editing, Done Right](https://www.sublimetext.com/)  
[下载 IntelliJ IDEA：JetBrains 功能强大、符合人体工程学的 Java IDE](https://www.jetbrains.com/zh-cn/idea/download)  

#### git config
```
git config user.email 邮箱
git config user.name 用户名
```

#### 从远程下载
```
git clone 项目地址
```

#### 推送远程
```
# 查看文件修改情况
git status

# 将文件添加到暂存区
git add .

# 添加文件修改备注信息
git commit -s -m '备注信息'

# 推送修改到原创
git push
```

#### 从远程更新
```
# 从远程仓库更新代码
git pull
```

#### 命令缩写
```
alias gd='git diff'
alias gst='git status'
alias gaa='git add --all'
alias gcsm='git commit -s -m'
alias gp='git push'
alias gl='git pull'
```

#### subl 配置
```
touch ~/.bash_profile

vim ~/.bashrc
alias subl='D:\\Sublime\ Text/sublime_text.exe'

subl 文件名
```
