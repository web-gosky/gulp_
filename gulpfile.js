var gulp = require('gulp');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-clean-css');
var rename = require('gulp-rename');
var htmlmin=require("gulp-htmlmin");

gulp.task('concatJs', function() {
	gulp.src('./js/*.js') //输入
		.pipe(concat('main.js')) //合并js
		.pipe(uglify()) //压缩js  调用的模块
		.pipe(gulp.dest('./dist')) //输出
});

gulp.task('concatCss', function() {
	gulp.src('./js/*.css')
		.pipe(concat('main.css'))
		.pipe(minifyCss())
		.pipe(gulp.dest('./dist'));
});
gulp.task('concatHtml', function() {
	gulp.src('./js/*.htm')
//		.pipe(concat('main.css'))
	  .pipe(htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest('./dist'));
});


gulp.task('default', ['concatJs','concatCss','concatHtml']);
//gulp.task('default', function() {
//	gulp.run('concatJs');
//	gulp.run('concatCss');
//
//});