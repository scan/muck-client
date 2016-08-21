var gulp = require('gulp'),
    usemin = require('gulp-usemin'),
    csso = require('gulp-csso'),
    uglify = require('gulp-uglify'),
    rev = require('gulp-rev'),
    htmlmin = require('gulp-htmlmin'),
    wiredep = (require('wiredep')).stream,
    del = require('del'),
    jade = require('gulp-jade'),
    nodemon = require('gulp-nodemon');

gulp.task('clean', function() {
  return del(['./public/scripts', './public/styles', './public/templates', './public/images']);
});

gulp.task('bower', ['clean'], function() {
  return gulp.src('./app/index.html').pipe(wiredep()).pipe(gulp.dest('./.tmp'));
});

gulp.task('usemin', ['bower'], function() {
  return gulp.src('./.tmp/*.html').pipe(usemin({
    css: [csso, rev],
    html: [
      function() {
        return htmlmin({
          empty: true
        });
      }
    ],
    js: [uglify, rev],
    jsAttributes: {
      defer: true
    },
    inlinejs: [uglify],
    inlinecss: [csso, 'concat'],
    path: './app'
  })).pipe(gulp.dest('./public/'));
});

gulp.task('minify', ['usemin'], function() {
  return gulp.src('./public/index.html').pipe(htmlmin({
    collapseWhitespace: true
  })).pipe(gulp.dest('./public'));
});

gulp.task('jade', ['clean'], function() {
  return gulp.src('./app/templates/**/*.jade').pipe(jade()).pipe(gulp.dest('./public/templates/'));
});

gulp.task('images', ['clean'], function() {
  return gulp.src('./app/images/**/*').pipe(gulp.dest('./public/images/'));
});

gulp.task('build', ['minify', 'jade', 'images']);

gulp.watch('./app/**/*', ['build']);

gulp.task('serve', function() {
  return nodemon({
    script: './index.js',
    ext: 'js coffee',
    legacyWatch: true
  });
});

gulp.task('default', ['serve', 'build']);
