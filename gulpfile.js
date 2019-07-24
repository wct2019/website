var gulp = require('gulp'),
    sass = require('gulp-sass'),
    cleanCss = require('gulp-clean-css'),
    postcss = require('gulp-postcss'),
    cssnext = require('postcss-cssnext'),
    paths = {
        themeRoot:        './',
        src:        'sass/',
        assets:     'docs/',
        img:        'img/',
    };

gulp.task('css', function(){
    var processors = [
      cssnext({browsers: ['last 2 version']})
    ];
    return gulp.src(paths.src + '**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCss({debug: true}, (details) => {
        console.log(`${details.name}: ${details.stats.originalSize}`);
        console.log(`${details.name}: ${details.stats.minifiedSize}`);
    }))
    .pipe(postcss(processors))
    .pipe(gulp.dest(paths.assets));
});

//watching task
gulp.task('watch', function(){
    gulp.watch([paths.src + '**/*.scss'], gulp.task('css'));
});