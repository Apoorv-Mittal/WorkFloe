/**
 * Created by apoorvmittal on 6/24/17.
 */
var gulp = require('gulp'),
    gutil = require('gulp-util'),
    concat = require('gulp-concat'),
    browserify = require('gulp-browserify'),
    connect = require('gulp-connect'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    minifyHTML = require('gulp-minify-html'),
    pngcrush = require('gulp-pngcrush'),
    imagemin = require('gulp-imagemin');

gulp.task('log', function () {
    gutil.log('You are using Gulp');
});

var env,
    jsSources,
    htmlSources,
    jsonSources,
    outputDir;


env = process.env.NODE_ENV  || 'development';

if( env ==='development'){
    outputDir = 'builds/development/'
}else {
    outputDir = 'builds/production/'
}


// add all the js file names in here
jsSources =['components/scripts/template.js'];
htmlSources=[outputDir +'*.html'];
jsonSources=[outputDir+'*.json'];


gulp.task('js', function () {
    gulp.src(jsSources)
        .pipe(concat('script.js'))
        .pipe(browserify())
        .pipe(gulpif(env === 'production', uglify()))
        .pipe(gulp.dest(outputDir+'js'))
        .pipe(connect.reload())
});

//can add more tasks that monitors any change and then reruns the task if there is an error
gulp.task('watch', function () {
    gulp.watch(jsSources, ['js']);
    gulp.watch('builds/development/*.html',['html']);
    gulp.watch(jsonSources,['json']);
    gulp.watch(outputDir+'images/**/*.*',['images']);
});

gulp.task('connect', function () {
    connect.server({
        root :outputDir,
        livereload: true
    });
});

//looks for change in the html file
gulp.task('html', function () {
    gulp.src('builds/development/*.html')
        .pipe(gulpif(env === 'production',minifyHTML()))
        .pipe(gulpif(env === 'production',gulp.dest(outputDir)))
        .pipe(connect.reload())
});


//crushes images
gulp.task('images', function () {
    gulp.src('builds/development/images/**/*.*')
        .pipe(gulpif(env === 'production',imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            use: [pngcrush()]
        }))
        .pipe(gulpif(env === 'production',gulp.dest(outputDir + 'images'))))
        .pipe(connect.reload())
});

//looks for any change in anj JSON file
gulp.task('json', function () {
    gulp.src(jsonSources)
        .pipe(connect.reload())
});
//in the array all the gulp tasks
gulp.task('default',['html','js','json','images','watch','connect']);