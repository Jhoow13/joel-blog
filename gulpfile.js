var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    pug = require('gulp-pug'),
    sass = require('gulp-sass'),
    cssNano = require('gulp-cssnano');
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    imageMin = require('gulp-imagemin');

var files = {
    pugFiles:[
      'src/index.pug'
    ],
    scssFiles:[
      'src/sass/all.scss'
    ],
    jsFiles:[
      'src/js/*.js'
    ],
    imgFiles:[
      'src/img/**/*.*',
    ]
};

gulp.task('clean', function(){
    return gulp.src('dist/*')
    .pipe(clean());
});

gulp.task('pug', function(){
  return gulp.src(files.pugFiles)
  .pipe(pug({
    pretty: true
  }))
  .pipe(gulp.dest('dist/'))
})

gulp.task('css-dev', function(){
    return gulp.src(files.scssFiles)
    .pipe(sourcemaps.init())
    .pipe(concat('style.min.css'))
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(cssNano())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/css/'));
});

gulp.task('css-prod', function(){
  return gulp.src(files.scssFiles)
  .pipe(concat('style.min.css'))
  .pipe(sass())
  .pipe(autoprefixer())
  .pipe(cssNano())
  .pipe(gulp.dest('dist/css/'));
});

gulp.task('js', function(){
    return gulp.src(files.jsFiles)
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest('dist/js/'));
});

gulp.task('img', function() {
	gulp.src(files.imgFiles)
		.pipe(imageMin())
		.pipe(gulp.dest('dist/img'));
});

gulp.task('reload', function(done){
    browserSync.reload();
    done();
});

gulp.task('dev', ['pug','img', 'css-dev','js'], function(){
  browserSync.init({
    server: {
        baseDir: "./dist/"
    }
  });

  gulp.watch([files.pugFiles, 'src/pug/**/*.pug'], ['pug', browserSync.reload]);
  gulp.watch([files.scssFiles, 'src/sass/**/*.scss'], ['css-dev', browserSync.reload]);
  gulp.watch([files.jsFiles, 'src/js/**/*.js'], ['js', browserSync.reload]);
});

gulp.task('default', ['dev']);
gulp.task('prod', ['pug', 'img', 'css-prod', 'js']);