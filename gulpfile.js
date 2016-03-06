var gulp = require('gulp'),
    livereload = require('gulp-livereload'),
    watch = require('gulp-watch');

gulp.task('default',function(){
    livereload.listen();
    gulp.watch('./css/*.scss').on('change',livereload.changed);
    gulp.watch('./view/*.html').on('change',livereload.changed);
})