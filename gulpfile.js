var gulp = require('gulp');
var eslint = require('gulp-eslint');
var istanbul = require('gulp-istanbul');
var mocha = require('gulp-mocha');
// var codeclimate = require('gulp-codeclimate-reporter');

gulp.task('test.instrument', function instrument() {
  return gulp
    .src(['!test/**/*', '!gulpfile.js', '!dist/**/*', '!node_modules/**/*', '**/*.js'])
    .pipe(istanbul({
      includeUntested: true
    }))
    .pipe(istanbul.hookRequire())
  ;
});

gulp.task('test', ['test.instrument'], function test() {
  return gulp
    .src(['test/**/*.test.js'])
    .pipe(mocha({
      require: ['./test/bootstrap']
    }))
    .pipe(istanbul.writeReports({
      dir: './dist/test-report'
    }))
  ;
});

gulp.task('lint', function lint() {
  return gulp
    .src(['**/*.js', '!node_modules/**/*'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
  ;
});

gulp.task('default', ['lint', 'test']);