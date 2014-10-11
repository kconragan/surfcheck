// Dependencies
var gulp         = require('gulp'),
    sass         = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss    = require('gulp-minify-css'),
    jshint       = require('gulp-jshint'),
    uglify       = require('gulp-uglify'),
    imagemin     = require('gulp-imagemin'),
    rename       = require('gulp-rename'),
    concat       = require('gulp-concat'),
    notify       = require('gulp-notify'),
    del          = require('del'),
    useref       = require('gulp-useref'),
    rubysass     = require('gulp-ruby-sass');
    gulpif       = require('gulp-if'),
    cache        = require('gulp-cache'),
    webserver    = require('gulp-webserver'),
    plumber      = require('gulp-plumber'),
    browserify  = require('gulp-browserify'),
    transform    = require('vinyl-transform'),
    opn          = require('opn'),
    gzip         = require('gulp-gzip'),
    hbsfy        = require('hbsfy');

var config = {
  host: 'localhost',
  port: 8002,
  livereloadport: 35729,
  destination : 'dist',
  baseLibs : ['src/scripts/libs/**/*.js'],
  browserifyEntryPoints : ['src/scripts/app.js']
}

var onError = function(e) {
  console.log(e);
}

gulp.task('webserver', function() {
  gulp.src('dist')
    .pipe(webserver({
      host: config.host,
      port: config.port,
      livereload: true,
      directoryListing: false
    }))
});

gulp.task('openbrowser', function() {
  opn('http://' + config.host + ':' + config.port );
})

gulp.task('clean', ['cleanScripts', 'cleanCompass', 'cleanImages'], function(cb) {
});

gulp.task('cleanScripts', function(cb){
	del(['dist/scripts'], cb);
});

gulp.task('cleanCompass', function(cb){
	del(['dist/css'], cb);
});

gulp.task('cleanImages', function(cb){
	del(['dist/images'], cb);
});

gulp.task('baseLibs', ['cleanScripts'], function(){
	gulp.src(config.baseLibs)
		.pipe(gulp.dest('dist/scripts/libs/'));
});

// Scripts
gulp.task('scripts', ['baseLibs'], function() {

  var browserified = transform(function(filename) {
    var b = browserify(filename, {
      debug: true,
      transform: ['hbsfy']
    });
    return b.bundle();
  });

  return gulp.src(config.browserifyEntryPoints)
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(browserify({
      debug: true,
      transform: ['hbsfy'],
      extensions: ['.hbs']
    }))
    // .pipe(jshint('.jshintrc'))
    // .pipe(jshint.reporter('default'))
    .pipe(concat('app.js'))
    .pipe(uglify())
    // .pipe(gzip())
    .pipe(gulp.dest('dist/scripts'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('styles', function () {
  return gulp.src('src/styles/*.scss')
    .pipe(sass({ style: 'expanded' }))
    // .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
    .pipe(gulp.dest('dist/styles'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/css'))
    .pipe(notify({ message: 'Styles task complete' }));;
});

gulp.task('images', function () {
  return gulp.src('src/images/**/*')
    .pipe(cache(imagemin({
        progressive: true,
        interlaced: true
    })))
    .pipe(gulp.dest('dist/images'))
    .pipe(notify({ message: 'Images task complete' }));;
});

gulp.task('html', ['styles'], function () {
    var assets = useref.assets();

    return gulp.src('src/*.html')
      .pipe(assets)
      .pipe(gulpif('*.js', uglify()))
      .pipe(gulpif('*.css', minifycss()))
      .pipe(assets.restore())
      .pipe(useref())
      .pipe(gulp.dest('dist'))
      .pipe(notify({ message: 'HTML task complete' }));;
});

gulp.task('lint', function () {
  return gulp.src('src/scripts/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('misc', function () {
  return gulp.src([
        'src/*.{ico,png,txt}'
    ])
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {

  // Watch .scss files
  gulp.watch('src/styles/**/*.scss', ['styles']);

  // Watch .js files
  gulp.watch('src/scripts/**/*.js', ['scripts']);

  // Watch image files
  gulp.watch('src/images/**/*', ['images']);
  
  gulp.watch('src/**/*.html', ['html']);
  
  gulp.watch('src/**/*.hbs', ['scripts']);

});

gulp.task('default', ['watch', 'scripts', 'styles', 'html', 'images'], function () {
  gulp.start('webserver');
});
