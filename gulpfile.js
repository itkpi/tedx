var   gulp = require('gulp')
    , notify = require("gulp-notify")
    , csso = require('gulp-csso')
    , uglify = require('gulp-uglify')
    //, livereload = require('gulp-livereload')
    , imagemin = require('gulp-imagemin')
    , pngquant = require('imagemin-pngquant')
    , connect = require('gulp-connect')
    , compass = require( 'gulp-for-compass')
    , concat = require('gulp-concat')
    , autoprefixer = require('gulp-autoprefixer')
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
    gulp.src('./lib/**/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant({ quality: '50-70', speed: 4 })],
            //.pipe(pngquant({ quality: '65-80', speed: 4 })())
            interlaced: true
        }))
        .pipe(gulp.dest('./public/'));
});


//sass
gulp.task('sass', function(){
    gulp.src('./lib/sass/**/*.sass')
        .pipe(compass({
            sassDir: './lib/sass/',
            cssDir: './lib/css/',
            imagesDir: './lib/pic/',
            fontsDir: './lib/font/',
            force: true
        }))
        .pipe(connect.reload())
        .pipe(notify("Compile SASS"));
});


//concat
gulp.task('concat-js', function() {
    return gulp.src([
            './lib/js/owl.carousel.js',
            './lib/js/jquery.stellar.js',
            './lib/js/jquery.appear.js',
            './lib/js/app.js'
        ])
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./public/js/'));
});


//watch
gulp.task('watch', function () {
    gulp.watch('./index.html', ['html']);
    gulp.watch('./lib/sass/**/*', ['sass']);
    gulp.watch('./lib/css/**/*', ['css']);
    gulp.watch('./lib/js/**/*', ['js']);
});


//compress css
gulp.task('compress-css', function() {
    return gulp.src('./lib/css/style.css')
        .pipe(autoprefixer({
            browsers: ['last 10 versions'],
            cascade: false
        }))
        .pipe(csso())
        .pipe(gulp.dest('./public/css/'));
});


//compress js
gulp.task('compress-js', function() {
    gulp.src('./public/js/*')
        .pipe(uglify())
        .pipe(gulp.dest('./public/js/'))
});



gulp.task('default', ['server', 'html', 'js', 'sass', 'watch']);
gulp.task('production', ['sass', 'compress-js', 'concat-js', 'compress-css', 'compress-image']);