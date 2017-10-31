var gulp = require('gulp');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var replace = require('gulp-replace');
var cleanCSS = require('gulp-clean-css');
var gulpif = require('gulp-if');
var useref = require('gulp-useref');
var assetRev = require('ge-asset-rev');
var gulpSequence = require('gulp-sequence');
var clean = require('gulp-clean');
var wrap = require("gulp-wrap");
var rename = require("gulp-rename");
var jshint = require('gulp-jshint');
var seajsCombo = require('gulp-seajs-combo');
var jsdoc = require('gulp-jsdoc');
var concat = require('gulp-concat');
var arrayOfSquares = [];
var config = require('./gulpConfig.json');
var replaceUrl = config.replaceUrl;
var smushit = require('gulp-smushit');
var sass = require('gulp-sass');
var spritesmith = require("gulp-spritesmith");

gulp.task('help', function () {
    console.log('htmltpl 模板脚本化');
    console.log('jshint js检测');
    console.log('sprite 生成雪碧图');
    console.log('watch 全部监听');
    console.log('watch:sass sass监听');
});


//图片压缩
gulp.task('imgMin', function () {
    if (!config.imgMinFlag) {
        return gulp;
    }
    return gulp.src(config.src + config.staticImg + '/**/*.{jpg,png}')
        .pipe(smushit())
        .pipe(gulp.dest(config.test + config.staticImg));
});
//sass
gulp.task('sass', function () {
    return gulp.src(config.src + config.staticSass + '*.scss')
        .pipe(sass({loadPath: config.src + config.staticCss}))
        .pipe(gulp.dest(config.src + config.staticCss))
});
//sass 自动检测
gulp.task('watch:sass', function () {
    gulp.watch(config.src + config.staticSass + '*.scss', ['sass']);
});
//jsdoc
gulp.task('jsdoc', function () {
    if (!config.jsdocFlag) {
        return gulp;
    }
    return gulp.src(config.src + config.staticJs + "**/*.js")
        .pipe(jsdoc('jsdoc'))

});

gulp.task('build', function () {
    return gulp.src(config.src + '/**')
        .pipe(gulp.dest(config.build));
});
gulp.task('clean-seajs', function () {
    var seajsData = [];
    config.seajs.forEach(function (item) {
        seajsData.push(config.build + item.Entry);
    });
    return gulp.src(seajsData, {read: false})
        .pipe(clean());

});
gulp.task('clean-sass', function () {
    return gulp.src(config.build + config.staticSass, {read: false})
        .pipe(clean());

});

//清除已有文件夹
gulp.task('clean-test', function () {
    return gulp.src(config.test, {read: false})
        .pipe(clean());
});
gulp.task('clean-dist', function () {
    return gulp.src(config.dist, {read: false})
        .pipe(clean());
});
gulp.task('clean-static', function () {
    return gulp.src(config.static, {read: false})
        .pipe(clean());
});
gulp.task('clean-build', function () {
    return gulp.src(config.build, {read: false})
        .pipe(clean());
});
gulp.task('clean-dev', function () {
    return gulp.src(config.dev, {read: false})
        .pipe(clean());
});
gulp.task('clean-testStatic', function () {
    return gulp.src(config.testStatic, {read: false})
        .pipe(clean());
});
gulp.task('clean-pre', function () {
    return gulp.src(config.pre, {read: false})
        .pipe(clean());
});
//清除图片
gulp.task('clean-sprite', function () {
    return gulp.src(config.build + config.spriteImg, {read: false})
        .pipe(clean());
});
//清除原始html模板
gulp.task('clean-tplhtml', function () {
    return gulp.src(config.build + config.staticTplhtml, {read: false})
        .pipe(clean());
});
//清除jsdoc
gulp.task('clean-jsdoc', function () {
    return gulp.src(config.jsdoc, {read: false})
        .pipe(clean());
});
gulp.task('jshint', function () {
    return gulp.src(config.src + config.staticJs + '**')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});
gulp.task('seajscombo2', function () {
    config.seajs.forEach(function (item) {
        return gulp.src(config.src + item.Entry + item.Name)
            .pipe(seajsCombo())
            .pipe(uglify())
            .pipe(gulp.dest(config.build + item.Out));
    });


});
gulp.task('copy-seajs2', function () {
    config.seajs.forEach(function (item) {
        return gulp.src(config.build + item.Out + '**')
            .pipe(gulp.dest(config.test + item.Out));
    });
});

gulp.task('useref', function () {
    return gulp.src(config.build + '/*.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', cleanCSS({compatibility: 'ie7'})))
        .pipe(gulp.dest(config.test));
});
//复制内容到test
gulp.task('copy-test', function () {
    return gulp.src(config.build + config.staticImg + '**')
        .pipe(gulp.dest(config.test + config.staticImg));
});
//复制内容到dist
gulp.task('copy-dist', function () {
    return gulp.src(config.test + '/**')
        .pipe(gulp.dest(config.dist));
});
//复制test到dev
gulp.task('copy-dev', function () {
    return gulp.src(config.test + '/**')
        .pipe(gulp.dest(config.dev));
});
//复制test到testStatic
gulp.task('copy-testStatic', function () {
    return gulp.src(config.test + '/**')
        .pipe(gulp.dest(config.testStatic));
});
//复制test到pre
gulp.task('copy-pre', function () {
    return gulp.src(config.test + '/**')
        .pipe(gulp.dest(config.pre));
});
//复制test到static
gulp.task('copy-static', function () {
    return gulp.src(config.test + '/**')
        .pipe(gulp.dest(config.static));
});
//替换test页面资源内容
gulp.task('replace-htmlUrlTest', function () {
    return gulp.src([config.test + '/*.html'])
        .pipe(replace(config.htmlUrl, config.htmlReplaceUrl + replaceUrl + config.htmlAssetsUrl))
        .pipe(gulp.dest(config.test));
});

//替换test页面内容
gulp.task('replace-test', function () {
    return gulp.src([config.test + '/**', '!' + config.test + config.staticImg + '**'])
        .pipe(replace(replaceUrl, config.testUrl))
        .pipe(gulp.dest(config.test));
});
//替换static页面内容
gulp.task('replace-static', function () {
    return gulp.src([config.static + '/**', '!' + config.static + config.staticImg + '**'])
        .pipe(replace(replaceUrl, config.staticUrl))
        .pipe(gulp.dest(config.static));
});
//替换pre页面内容
gulp.task('replace-pre', function () {
    return gulp.src([config.pre + '/**', '!' + config.pre + config.staticImg + '**'])
        .pipe(replace(replaceUrl, config.preUrl))
        .pipe(gulp.dest(config.pre));
});
//替换testStatic页面内容
gulp.task('replace-testStatic', function () {
    return gulp.src([config.testStatic + '/**', '!' + config.testStatic + config.staticImg + '**'])
        .pipe(replace(replaceUrl, config.testStaticUrl))
        .pipe(gulp.dest(config.testStatic));
});
//替换dev页面内容
gulp.task('replace-dev', function () {
    return gulp.src([config.dev + '/**', '!' + config.dev + config.staticImg + '**'])
        .pipe(replace(replaceUrl, config.devUrl))
        .pipe(gulp.dest(config.dev));
});


//替换样式 不使用
gulp.task('revall', function () {
    return gulp.src(config.test + '/*.html')
        .pipe(assetRev())
        .pipe(gulp.dest(config.test));
});
gulp.task('revallcss', function () {
    return gulp.src(config.test + config.staticCss + '**')
        .pipe(assetRev())
        .pipe(gulp.dest(config.test + config.staticCss))
});

//clean-img
gulp.task('clean-img', function () {
    return gulp.src(config.src + config.staticImg, {read: false})
        .pipe(clean());
});
//复制图片
gulp.task('spriter-copyimg', function () {
    return gulp.src(config.src + config.spriteImg + '**').pipe(gulp.dest(config.src + config.staticImg));
});

//删除合成的图片
gulp.task('spriter-delimg', function () {
    config.spritesList.forEach(function (item) {
        return gulp.src(config.src + config.staticImg + item.url, {read: false}).pipe(clean());
    });
});

//删除 bat文件
gulp.task('clean-rename', function () {
    return gulp.src(config.src + config.staticImg + '**/*.bat', {read: false})
        .pipe(clean());
});

//生成雪碧图
gulp.task('sprites', function () {
    config.spritesList.forEach(function (item) {
        return gulp.src(config.src + config.spriteImg + item.url)
            .pipe(spritesmith({
                imgName: item.imgName,//生成雪碧图的名字
                styleName: item.cssName,//生成css的名字
                //retinaImgName: ' sprite@2x.png ',
                padding: 5,//生成雪碧图片的间隔
                algorithm: item.algorithm,//生成的方式
                imgPath: config.spriteOutSrc + item.out + item.imgName,//css中引用雪碧图的位置
                styleTemplate: config.src + config.spriteTemplate //css模版
            }))
            .pipe(gulpif('*.png', gulp.dest(config.src + config.staticImg + item.out)))
            .pipe(gulpif('*.scss', gulp.dest(config.src + config.staticSass + 'sprite')));
    });
});


//模板化
gulp.task('htmltpl', function () {
    var options = {
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeComments: true,
        removeEmptyAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        minifyJS: true,
        minifyCSS: true
    };
    return gulp.src(config.src + config.staticTplhtml + '*.html')
        .pipe(htmlmin(options))
        .pipe(wrap("define(function(){return '<%= contents %>'});"))
        .pipe(rename(function (path) {
            path.extname = ".js"
        }))
        .pipe(gulp.dest(config.src + config.staticTpl))
});
//全部监听
gulp.task('watch', gulpSequence('watch:sass'));
//雪碧图
gulp.task('sprite', gulpSequence('clean-img', 'spriter-copyimg', 'spriter-delimg', 'clean-rename', 'sprites'));

//开发源代码生成
gulp.task('default', gulpSequence(
    ['clean-test', 'clean-build', 'clean-static', 'clean-pre', 'clean-testStatic', 'clean-dev', 'clean-jsdoc', 'clean-dist'], //清除版本
    'clean-img', 'spriter-copyimg', 'spriter-delimg', 'clean-rename', 'sprites', //雪碧图
    ['htmltpl', 'sass', 'imgMin'],//src内 模板 sass 图片压缩
    'build', //建立build
    ['clean-seajs', 'clean-sass', 'clean-sprite', 'clean-tplhtml'], //清除build 多余文件
    'seajscombo2', 'useref',//src生成到build
    ['copy-test', 'copy-seajs2'],//build拷贝到test
    'copy-dist',
    'replace-htmlUrlTest',
    ['copy-static', 'copy-dev', 'copy-pre', 'copy-testStatic'],//拷贝test 成其他4个版本
    ['replace-test', 'replace-static', 'replace-testStatic', 'replace-dev', 'replace-pre'],//替换全局变量
    'clean-build',//清除build
    ['jshint', 'jsdoc']//jshit检测 jsdoc 文档生成
));