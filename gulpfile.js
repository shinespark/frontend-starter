'use strict';

var HTML_SRC = './template/**/*.html';
var CSS_SRC  = './css/**/*.css';
var SCSS_SRC = './src/sass/**/*.scss';
var CSS_DEST = './css/';

var gulp = require('gulp');
var sass = require('gulp-sass');
var scsslint = require('gulp-scss-lint');
var bs = require('browser-sync').create();

// browser-sync
gulp.task('bs', function(){
  var bsOptions = {};
  bsOptions.files = [HTML_SRC, CSS_SRC];
  // bsOptions.proxy = 'localhost:3000';
  bsOptions.port  = 3001;
  bs.init(bsOptions);
});


// SCSS
gulp.task('sass', function(){
  return gulp.src(SCSS_SRC)
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest(CSS_DEST));
});


// scss-lint
gulp.task('scss-lint', function(){
  return gulp.src(SCSS_SRC)
    .pipe(scsslint());
});


// scss-watch
gulp.task('scss:watch', function(){
  var watcher = gulp.watch(SCSS_SRC, ['scss-lint', 'sass']);
  watcher.on('change', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
});

gulp.task('default', ['bs', 'scss:watch']);
