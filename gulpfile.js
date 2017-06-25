/**
 * Created by apoorvmittal on 6/24/17.
 */
var gulp = require('gulp'),
    gutil = require('gulp-util'),
    concat = require('gulp-concat');
    browserify = require('gulp-browserify');

gulp.task('log', function () {
    gutil.log('You are using Gulp');
});

// add all the js file names in here
var jsSources =[
    'components/scripts/template.js'
];
gulp.task('js', function () {
    gulp.src(jsSources)
        .pipe(concat('script.js'))
        .pipe(browserify())
        .pipe(gulp.dest('builds/development/js'))
});

//can add more tasks that monitors any change and then reruns the task if there is an error
gulp.task('watch', function () {
    gulp.watch(jsSources, ['js']);
})

//in the array all the gulp tasks
gulp.task('default',['js','watch']);