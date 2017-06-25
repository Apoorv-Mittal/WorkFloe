/**
 * Created by apoorvmittal on 6/24/17.
 */
var gulp = require('gulp'),
    gutil = require('gulp-util'),
    concat = require('gulp-concat');
    browserify = require('gulp-browserify');
    connect = require('gulp-connect');

gulp.task('log', function () {
    gutil.log('You are using Gulp');
});

// add all the js file names in here
var jsSources =[
    'components/scripts/template.js'
];
var htmlSources=['builds/development/*.html'];
var jsonSources=['builds/development/*.json'];


gulp.task('js', function () {
    gulp.src(jsSources)
        .pipe(concat('script.js'))
        .pipe(browserify())
        .pipe(gulp.dest('builds/development/js'))
        .pipe(connect.reload())
});

//can add more tasks that monitors any change and then reruns the task if there is an error
gulp.task('watch', function () {
    gulp.watch(jsSources, ['js']);
    gulp.watch(htmlSources,['html']);
    gulp.watch(jsonSources,['json']);
});

gulp.task('connect', function () {
    connect.server({
        root :'build/development/',
        livereload: true
    });
});

//looks for change in the html file
gulp.task('html', function () {
    gulp.src(htmlSources)
        .pipe(connect.reload())
});

//looks for any change in anj JSON file
gulp.task('json', function () {
    gulp.src(jsonSources)
        .pipe(connect.reload())
});
//in the array all the gulp tasks
gulp.task('default',['html','js','json','watch','connect']);