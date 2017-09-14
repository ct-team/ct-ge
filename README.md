# GulpEngineering

## 介绍

GulpEngineering 能帮你按配置自动合并打包成测试版与正式版，自动替换css与js缓存时间戳。

## 版本 

0.0.2

## 下载地址

github [0.0.2](https://github.com/ct-team/ct-ge)

## 安装 =====

执行 npm install 安装

## 文件夹说明

/assets 资源文件

/assets/css 样式文件

/assets/js 脚本文件

/assets/js/app seajs文件 主文件名默认用 main.js

/assets/img 图片文件

/assets/tpl js生成模板文件

/assets/tplhtml 模板文件

## 合并说明

通过build 可以在页面上方便把要合并的资源进行合并 放到指定的路径 并不影响src的测试

```
//样式合并
<!--build:css assets/css/main.min.css -->
<link href="assets/css/base.css" rel="stylesheet" type="text/css">
<link href="assets/css/side.css" rel="stylesheet" type="text/css">
<link href="assets/css/main.css" rel="stylesheet" type="text/css">
<link href="assets/css/pages.css" rel="stylesheet" type="text/css">
<link href="assets/css/pop.css" rel="stylesheet" type="text/css">
<link href="assets/css/vip.css" rel="stylesheet" type="text/css">
<!-- endbuild -->

//脚本合并
<!--build:js assets/js/app.min.js -->
<script src="assets/js/lib/pages.js" type="text/javascript"></script>
<script src="assets/js/lib/slider.js" type="text/javascript"></script>
<script src="assets/js/config.js"></script>
<!-- endbuild -->

```

## 配置说明

配置文件gulpConfig.json

```
// 测试版地址与正式版地址能把页面上的 static/ 替换成下面地址
//测试版地址
"testUrl":"http://static.tcy365.org:1505/uc/tchallvip/assets/",
//正式版地址
"staticUrl":"http://static.tcy365.com/uc/tchallvip/assets/",
// js/app seajs打包配置 多个页面可创建多个app
"seajs":[
	{"Entry":"/assets/js/app/","Out":"/assets/js/app/","Name":"main.js"},
	{"Entry":"/assets/js/app2/","Out":"/assets/js/app2/","Name":"main.js"}
],	
//下面是文件配置不需要修改
"build":"build",	
"test":"test",
"src":"src",
"sprite":"sprite",
"static":"static",
"staticJs":"/assets/js/",	
"staticCss":"/assets/css/",	
"staticImg":"/assets/img/",
"staticTpl":"/assets/tpl/",
"staticTplhtml":"/assets/tplhtml/"
```

## 生成

执行gulp

生成test 测试版

生成static 正式版

