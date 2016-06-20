var   gulp         = require('gulp')
    , notify       = require("gulp-notify")
    , csso         = require('gulp-csso')
    , uglify       = require('gulp-uglify')
    , connect      = require('gulp-connect')
    , compass      = require('gulp-for-compass')
    , concat       = require('gulp-concat')
    , autoprefixer = require('gulp-autoprefixer')
    , imageminJpegtran = require('imagemin-jpegtran')
    , imageminPngquant = require('imagemin-pngquant')
    , imageResize = require('gulp-image-resize')
    , exit = require('gulp-exit')
    ;

//server
gulp.task('server', function() {
    connect.server({
        livereload: true
    });
});


//html
gulp.task('html',function(){
    gulp.src('index.html')
        .pipe(connect.reload())
        .pipe(notify("Change index.html"));
});


//css
gulp.task('css',function(){
    gulp.src('style.css')
        .pipe(connect.reload());
});


//js
gulp.task('js', function() {
    gulp.src('./lib/js/**/*.js')
        .pipe(connect.reload());
});


//compress pic
gulp.task('compress-image', function () {
    gulp.src('./lib/**.jpg')
        .pipe(imageminJpegtran({progressive: true})())
        .pipe(gulp.dest('./build/lib/'));

    gulp.src('./lib/pic/**')
        .pipe(imageResize({ width : 1280 }))
        .pipe(gulp.dest('./build/lib/pic/'));

    gulp.src('./lib/image/**')
        .pipe(imageResize({ width : 300 }))
        .pipe(imageminJpegtran({progressive: true})())
        .pipe(imageminPngquant({quality: '65-80', speed: 4})())
        .pipe(gulp.dest('./build/lib/image/'));
});


//sass
gulp.task('sass', function(){
    gulp.src('./lib/sass/**/*.sass')
        .pipe(compass({
            httpFontsPath:  '../font/',
            httpGeneratedImagesPath: '../pic/',
            cssDir:    './lib/css/',
            sassDir:   './lib/sass/',
            fontsDir:  './lib/font/',
            imagesDir: './lib/pic/',
            force: true
        }))
        .pipe(connect.reload())
        .pipe(notify("Compile SASS"))
        .pipe(exit());
});


//concat
gulp.task('concat-js', function() {
    return gulp.src([
            './lib/js/owl.carousel.js',
            //'./lib/js/jquery.stellar.js',
            //'./lib/js/jquery.appear.js',
            './lib/js/app.js',
            './lib/js/map.js'
        ])
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./lib/js/'));
});


//watch
gulp.task('watch', function () {
    gulp.watch('./index.html', ['html']);
    gulp.watch('./lib/sass/**/*', ['sass']);
    gulp.watch('./lib/css/**/*', ['css']);
    gulp.watch('./lib/js/**/*', ['concat-js', 'js']);
});


//compress css
gulp.task('compress-css', function() {
    return gulp.src('./lib/css/style.css')
        .pipe(autoprefixer({
            browsers: ['last 10 versions'],
            cascade: false
        }))
        .pipe(csso())
        .pipe(gulp.dest('./build/lib/css/'));
});


//compress js
//gulp.task('compress-js', function() {
//    gulp.src('./public/js/*')
//        .pipe(uglify())
//        .pipe(gulp.dest('./public/js/'))
//});

gulp.task('copy-src',['build-static', 'compress-css', 'compress-image'],function() {
  gulp.src(['./index.html','./favicon.*'])
    .pipe(gulp.dest('./build'))
  gulp.src(['./lib/font/*'])
    .pipe(gulp.dest('./build/lib/font'))
  gulp.src(['./lib/css/*'])
    .pipe(gulp.dest('./build/lib/css'))
  gulp.src(['./lib/js/app.min.js'])
    .pipe(gulp.dest('./build/lib/js'))
});

gulp.task('build-static', ['sass', 'css', 'js', 'concat-js']);
gulp.task('default', ['server', 'html', 'build-static', 'watch']);
gulp.task('production', ['build-static', 'copy-src']);
