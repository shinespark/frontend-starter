var gulp = require('gulp');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var scsslint = require('gulp-scss-lint');
var bs = require('browser-sync').create();

// browser-sync
gulp.task('bs', function(){
  var bsOptions = {};
  bsOptions.files = ['template/**/*.html', 'css/**/*.css'];
  bsOptions.port  = 3000;
  bs.init(bsOptions);
});


// SCSS with scss-lint
gulp.task('scss-with-scss-lint', function(){
  return gulp.src('./src/sass/**/*.scss')
    .pipe(plumber())
    .pipe(scsslint());
    .pipe(sass())
    .pipe(gulp.dest('./css/'));
});


// scss-lint
gulp.task('scss-lint', function(){
  return gulp.src('./src/sass/**/*.scss')
    .pipe(scsslint());
});


// scss-watch
gulp.task('scss-watch', ['sass'], function(){
  var watcher = gulp.watch('./src/sass/**/*.scss', ['scss-with-scss-lint']);
  watcher.on('change', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
});

gulp.task('default', ['bs', 'scss-watch']);

