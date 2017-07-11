//导入工具包 require('node_modules里对应模块')
var gulp = require('gulp'); //本地安装gulp所用到的地方
   var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var uglify= require('gulp-uglify');
var concat = require('gulp-concat');


gulp.task('testAutoFx', function () {
    gulp.src('./css/abc.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0'],
            cascade: true, //是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
            remove:true //是否去掉不必要的前缀 默认：true
        }))
        .pipe(gulp.dest('build/css'));
});

//定义一个testLess任务（自定义任务名称）
gulp.task('testLess', function () {
    gulp.src('./css/*.less') //该任务针对的文件
        .pipe(less()) //该任务调用的模块
        .pipe(livereload())
        .pipe(gulp.dest('dist/css')); //将会在src/css下生成index.css
});
gulp.task('watch',function () {
    livereload.listen();
    gulp.watch('./css/**/*.less',['less']);

});

gulp.task('testConcat', function () {
    gulp.src('js/*.js')
        .pipe(concat('boundle.js'))//合并后的文件名
        .pipe(gulp.dest('dist/js'));
});

gulp.task('jsmin', function () {
    //压缩src/js目录下的所有js文件
    //除了test1.js和test2.js（**匹配src/js的0个或多个子文件夹）
    gulp.src(['./js/*.js', '!src/js/**/{test1,test2}.js'])
        .pipe(uglify({
                mangle: true
        }))
       // .pipe(concat('bond.js'))

        .pipe(gulp.dest('build/js'))
    ;
});
cssmin = require('gulp-minify-css');

gulp.task('testCssmin', function () {
    gulp.src('./css/*.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0'],
        cascade: true, //是否美化属性值 默认：true 像这样：
        //-webkit-transform: rotate(45deg);
        //        transform: rotate(45deg);
        remove:true //是否去掉不必要的前缀 默认：true
             }
        ))
        .pipe(cssmin())
        .pipe(gulp.dest('dist/css'));
});


const cssScss = require('gulp-scss');

gulp.task('css', function () {

 gulp.src('./css/*.scss')
        .pipe()
        .pipe(gulp.dest('dist/css'));
});
var sass = require('gulp-sass');
var sourcemaps =require('gulp-sourcemaps')
gulp.task('sass', function () {
    return gulp.src('./css/**/*.scss')
        // .pipe(sourcemaps.init())

        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer(
            {

            browsers: ['last 2 versions', 'Android >= 4.0'],
        cascade: true, //是否美化属性值 默认：true 像这样：
        //-webkit-transform: rotate(45deg);
        //        transform: rotate(45deg);
        remove:true //是否去掉不必要的前缀
            }

        ))
        .pipe(cssmin())
        // .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/css'));
});
rev = require('gulp-rev-append');

var  htmlminify=require('gulp-html-minifier');
gulp.task('htmlMin',function () {
    gulp.src('./*.html')
        .pipe(rev())
        .pipe(htmlminify({collapseWhitespace: true}))
        .pipe(gulp.dest('dist'))
});
gulp.task('sass:watch', function () {
    gulp.watch('./css/**/*.scss', ['sass']);
    gulp.watch('./*.html',['htmlMin']);
    gulp.watch('./js/**/*.js',['testConcat']);

});

gulp.task('testRev', function () {
    gulp.src('./*.html')
        .pipe(rev())
        .pipe(gulp.dest('dist'));
});
gulp.task('default', ['sass:watch','sass','htmlMin','testConcat']);

//gulp.task('default',['testLess']); //定义默认任务 elseTask为其他任务，该示例没有定义elseTask任务
 