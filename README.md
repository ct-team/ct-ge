# GulpEngineering

## 介绍

GulpEngineering 能帮你按配置自动合并打包成测试版与正式版，自动替换css与js缓存时间戳。

## 版本 

0.1.0

## 下载地址

github https://github.com/ct-team/ct-ge

## 安装

执行 npm install 安装

## 文件夹说明
```
{
  "htmlUrl": "assets/", //页面资源标识（页面替换）
  "htmlReplaceUrl": "//static.tcy365", //资源站路径
  "htmlAssetsUrl": "/uc/tt/", //资源站项目文件夹
  "replaceUrl": "[TCYURL]", //资源站端口标识（全局替换）
  "staticUrl": ".com",
  "preUrl": ".com:2505",
  "testStaticUrl": ".org:1505",
  "testUrl": ".org:1507",
  "devUrl": ".org:1506",  
  "seajs": [
    {
      "Entry": "/assets/js/app/",
      "Out": "/assets/js/app/",
      "Name": "main.js"
    },
    {
      "Entry": "/assets/js/app2/",
      "Out": "/assets/js/app2/",
      "Name": "main.js"
    }
  ],
  "jsdocFlag": true,
  "jsdoc": "jsdoc",
  "build": "build",
  "dev": "build_dev",
  "test": "build_test",
  "testStatic": "build_testStatic",
  "pre": "build_pre",
  "static": "build_static",
  "src": "src",
  "sprite": "sprite",
  "staticJs": "/assets/js/",
  "staticCss": "/assets/css/",
  "staticImg": "/assets/img/",
  "staticTpl": "/assets/tpl/",
  "staticTplhtml": "/assets/tplhtml/"
}
```
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
// 需要你修改的地方

"htmlAssetsUrl": "/uc/tt/", //资源站项目文件夹
// js/app seajs打包配置 多个页面可创建多个app
"seajs":[
	{"Entry":"/assets/js/app/","Out":"/assets/js/app/","Name":"main.js"},
	{"Entry":"/assets/js/app2/","Out":"/assets/js/app2/","Name":"main.js"}
],	

```

## 生成

执行gulp

生成build_dev 开发版

生成build_test 提测版

生成build_testStatic 测试稳定版

生成build_pre 预发版

生成build_static 正式版

