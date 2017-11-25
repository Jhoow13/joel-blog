var gulp = require('gulp');
var shell = require('gulp-shell');
var browserSync = require('browser-sync').create();

gulp.task('build', function(){
  return shell.task(['bundle exec jekyll serve']);
});

gulp.task('reload', function(done){
  browserSync.reload();
  done();
});

gulp.task('serve', function () {
    browserSync.init({
      server: {
        baseDir: '_site/'
      }
    });
    gulp.watch('_site/**/*.*', ['reload']);
});

gulp.task('default', ['build', 'serve']);