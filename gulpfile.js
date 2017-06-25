/**
 * Created by apoorvmittal on 6/24/17.
 */
var gulp = require('gulp'),
     gutil = require('gulp-util'),
    concat = require('gulp-concat');

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
        .pipe(gulp.dest('builds/development/js'))
})
