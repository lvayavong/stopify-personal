
var gulp = require ('gulp');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
// top level functions
// gulp.task - define tasks
// gulp.src - point to files to user
// gulp.dest - point to folder to output
// gulp.watch - watch files and folders for


// logs message
gulp.task('message', function(){
  return console.log ('gulp is running');
});

// copy all html files
gulp.task('copyHtml', function(){
  gulp.src('src/*html')
    .pipe(gulp.dest('public'));
});

//optimise images
gulp.task('imageMin', () =>
    gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('public/images'))
);

// minify js
gulp.task('minify', function() {
  gulp.src('src/js/*.js')
    .pipe(uglify())
      .pipe(gulp.dest('public/js'));
  });

// compile sass
gulp.task('sass', function(){
  gulp.src('src/sass/*scss')
    .pipe(sass().on ('error', sass.logError))
    .pipe(gulp.dest('public/css'));
});

// Lint Task
gulp.task('lint', function () {
  return gulp.src('src/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

//scripts
gulp.task('script', function(){
  gulp.src('src/js/*.js')
  .pipe(concat('main.js'))
  // .pipe(uglify())
  .pipe(gulp.dest('public/js'))
});
gulp.task('default', ['message', 'copyHtml', 'imageMin', 'sass', 'script']);

gulp.task('watch', function(){
  gulp.watch('src/js/*.js', ['scripts']);
    gulp.watch('src/js/*.js', ['imageMin']);
    gulp.watch('src/sass/*.scss', ['sass']);
    gulp.watch('src/*.html', ['copyHtml']);
});
