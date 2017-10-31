# GulpEngineering
<<<<<<< HEAD
=======

## 介绍

GulpEngineering 能帮你按配置自动合并打包成测试版与正式版，自动替换css与js缓存时间戳。

## 版本 

0.0.2

## 下载地址

github https://github.com/ct-team/ct-ge

## 安装 =====

执行 npm install 安装

## 文件夹说明
>>>>>>> 8a474ca76503f18c788d5ee04638a91098c28ce9

## 介绍

GulpEngineering 能帮你按配置自动合并打包成测试版与正式版，自动替换css与js缓存时间戳。

## 版本 

<<<<<<< HEAD
0.2.0
=======
/assets/js/app seajs文件 主文件名默认用 main.js
>>>>>>> 8a474ca76503f18c788d5ee04638a91098c28ce9

## 功能

图片压缩

<<<<<<< HEAD
sass

雪碧图

html模板转js模板 到js/tpl/

seajs打包 （不要有重名文件）

生成6个版本 （本地|开发|提测|稳定测试|预发|正式）

jsdoc

jshint

## 下载地址

github https://github.com/ct-team/ct-ge

## 安装

执行 npm install 安装

## 文件夹说明

css //样式

img //生成后图片

js //脚本

scss //sass

sprite //图片

spritetemp //图片合并模板（不建议修改）

tplhtml //html模板


## 合并说明

通过build 可以在页面上方便把要合并的资源进行合并 放到指定的路径 并不影响src的测试

```
//样式合并
<!--build:css ./assets/css/main.min.css -->
<link href="./assets/css/base.css" rel="stylesheet" type="text/css">
<link href="./assets/css/side.css" rel="stylesheet" type="text/css">
<link href="./assets/css/main.css" rel="stylesheet" type="text/css">
<link href="./assets/css/pages.css" rel="stylesheet" type="text/css">
<link href="./assets/css/pop.css" rel="stylesheet" type="text/css">
<link href="./assets/css/vip.css" rel="stylesheet" type="text/css">
<!-- endbuild -->

//脚本合并
<!--build:js ./assets/js/app.min.js -->
<script src="./assets/js/lib/pages.js" type="text/javascript"></script>
<script src="./assets/js/lib/slider.js" type="text/javascript"></script>
<script src="./assets/js/config.js"></script>
<!-- endbuild -->

```

## 配置说明

配置文件gulpConfig.json

```

{
  "replaceUrl": "[TCYURL]",//资源站端口标识（全局替换）
  "staticUrl": ".com",
  "preUrl": ".com:2505",
  "testStaticUrl": ".org:1505",
  "testUrl": ".org:1507",
  "devUrl": ".org:1506",
  "htmlUrl": "./assets/",//页面资源标识（页面替换）
  "htmlReplaceUrl": "//static.tcy365",//资源站路径（需要修改）
  "htmlAssetsUrl": "/uc/tt/assets/",//资源站项目文件夹
  "seajs": [   //seajs 配置（需要修改）
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

  "spritesList": [ //雪碧图（需要修改）
      {
        "url": "ico/*.png", //路径 assets/sprite
        "out": "ee/", //路径 assets/img
        "algorithm": "left-right",//显示方式 4种 top-down left-right diagonal alt-diagonal binary-tree(推荐)
        "imgName": "ico.png", //生成的文件名
        "cssName": "ico.scss" //生成的 sass 路径 assets/sprite/
      }
  ],
  "jsdocFlag": true,//是否使用jsdoc
  "imgMinFlag": true,//是否压缩图片
  "jsdoc": "jsdoc",
  "build": "build",
  "dev": "build_dev",
  "test": "build_test",
  "testStatic": "build_testStatic",
  "pre": "build_pre",
  "static": "build_static",
  "dist":"build_dist",
  "src": "src",
  "staticSass": "/assets/scss/",
  "staticJs": "/assets/js/",
  "staticCss": "/assets/css/",
  "staticImg": "/assets/img/",
  "staticTpl": "/assets/js/tpl/",
  "staticTplhtml": "/assets/tplhtml/",
  "spriteImg":"/assets/sprite/",
  "spriteOutSrc":"../img/",
  "spriteTemplate":"/assets/spritetemp/handlebarsStr.scss"
}


```

## 生成

执行gulp

生成build_dist 本地版

生成build_dev 开发版

生成build_test 提测版

生成build_testStatic 测试稳定版

生成build_pre 预发版

生成build_static 正式版
=======
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
>>>>>>> 8a474ca76503f18c788d5ee04638a91098c28ce9

