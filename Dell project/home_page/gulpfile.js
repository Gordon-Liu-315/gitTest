//编译gulp任务
const gulp = require("gulp");

//处理html
const htmlmin = require("gulp-htmlmin");
gulp.task("copy-html",function(){
    return gulp.src("*.html")
    .pipe(htmlmin({
        removeEmptyAttibutes: true, // 移出所有空属性
        collapseWhitespace: true, // 压缩 html
    }))
    .pipe(gulp.dest("dist/"))
    .pipe(connect.reload());
})

//处理scss
const scss = require("gulp-sass");
const minifycss = require("gulp-minify-css");
const rename = require("gulp-rename");
gulp.task("scss",function(){
    return gulp.src("scss/index.scss")
    .pipe(scss())
    .pipe(gulp.dest("dist/css"))
    .pipe(minifycss())
    .pipe(rename("index.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload());
})

//处理css


//处理js
gulp.task("scripts",function(){
    return gulp.src(["*.js","!gulpfile.js"])
    .pipe(gulp.dest("dist/js"))
    .pipe(connect.reload());
})

//处理图片
gulp.task("images",function(){
    return gulp.src("*.{png,jpg}")
    .pipe(gulp.dest("dist/images"))
    .pipe(connect.reload());
})

//处理数据
gulp.task("data",function(){
    return gulp.src(["*.json","!package.json"])
    .pipe(gulp.dest("dist/data"))
    .pipe(connect.reload());
})

gulp.task("build",["copy-html","scss","scripts","images","data"],function(){
    console.log("项目搭建成功");
})

//监听
gulp.task("watch",function(){
    gulp.watch("*.html",["copy-html"]);
    gulp.watch("scss/index.scss",["scss"]);
    gulp.watch(["*.js","!gulpfile.js"],["scripts"]);
    gulp.watch("*.{png,jpg}",["images"]);
    gulp.watch(["*.json","!package.json"],["data"]);
})

//启动服务器
const connect = require("gulp-connect");
gulp.task("server",function(){
    connect.server({
        root:"dist",
        port:8800,
        livereload:true
    })
})

//监听和服务器一起用
gulp.task("defaule",["watch","server"]);