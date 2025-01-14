# `sushi-vue`

# 环境准备

- python >= 3.7
- `mysql` >= 5.7
- node >= 20.12.1
- `npm` >= 10.5.0

# 环境安装

- 安装python：https://www.python.org/downloads/release/python-391/
- 安装`MySQL`：https://dev.mysql.com/downloads/installer/
- 安装node：https://nodejs.org/en
- 具体安装过程，直接百度搜索或者B站教程一大堆
- 环境测试

```bash
python -v
mysql --version
npm -v
node -v
```

- 如果能够看到有版本，环境基本没问题，接下来环境搭建

# 环境搭建

## 前端（先成功启动后端）

```bash
# 在sushi-vue文件夹中打开命令行
npm install
npm run dev
# 浏览器访问，建议使用Google浏览器
http://localhost:8080/
```

## 后端

修改数据库配置，打开`app.py`和`models/Initialize_mysql.py`两个文件

`app.py`，找到代码第20行，将密码修改为你的`MySQL`登录的密码

your_password

```py
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:your_password@localhost/sushi_db'
```

`models/Initialize_mysql.py`，找到代码第9行

your_password

```py
DB_PASSWORD = 'your_password'
```

接下来是运行python后端

```bash
# 在sushi_project_backup_on_python-main文件夹中打开命令行
pip install -r requirements.txt
python models/Initialize_mysql.py # 初始化数据库
python app.py
```
