const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const browserSync = require('browser-sync').create();
const runSequence = require('run-sequence');

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

var dev = true;

gulp.task('styles', () => {
    return gulp.src('./src/styles/*.scss').pipe($.plumber()).pipe($.sass.sync({
        outputStyle: 'expanded',
        precision: 10,
        includePaths: ['.']
    }).on('error', $.sass.logError)).pipe($.autoprefixer({browsers: ['> 0%']})).pipe(gulp.dest('./app/assets/styles')).pipe(reload({stream: true}));
});

gulp.task('scripts', () => {
    return gulp.src('./src/scripts/**/*.js').pipe($.plumber()).pipe($.babel({presets: ['es2015']})).pipe(gulp.dest('./app/assets/scripts')).pipe(reload({stream: true}));
});

gulp.task('views', () => {
    return gulp.src('./src/templates/*.njk').pipe($.plumber()).pipe($.nunjucksRender({path: 'src/templates'})).pipe(gulp.dest('./app')).pipe(reload({stream: true}));
});

gulp.task('views:reload', gulp.series('views', () => {
    reload();
}));

gulp.task('scripts:reload', gulp.series('scripts', () => {
    reload();
}));

gulp.task('styles:reload', gulp.series('styles', () => {
    reload();
}));

gulp.task('serve', gulp.series(gulp.parallel('views', 'styles', 'scripts'), () => {
    browserSync.init({
        notify: false,
        port: 8000,
        server: {
            baseDir: ['app']
        }
    });

    gulp.watch('src/templates/**/*.njk').on('change', gulp.series('views:reload'));
    gulp.watch('src/styles/**/*.scss').on('change', gulp.series('styles:reload'));
    gulp.watch('src/scripts/**/*.js').on('change', gulp.series('scripts:reload'));
}));

gulp.task('default', gulp.series('serve'));
