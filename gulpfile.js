/**
 * RUN gulp watch
 */
var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require("gulp-rename");
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');


const SCSS_FORAM_TASK = 'compile_foram_scss';
const SCSS_VERISK_TASK = 'compile_verisk_scss';
const MAJOR_VERSION = '1'
const MINOR_VERSION = '0'
const PATCH_VERSION = '2'

const VERSION = `${MAJOR_VERSION}.${MINOR_VERSION}.${PATCH_VERSION}`

const component_list = [
    'component/Accordian/1.0.1/accordian.js',
    'component/Tab/1.0.0/tabs.js'
]
gulp.task(SCSS_FORAM_TASK, function () {
    return gulp.src('sass/vs.scss') // Get source files with gulp.src
        .pipe(sass()) // Sends it through a gulp plugin
        .pipe(gulp.dest(`css/${VERSION}`)) // Outputs the file in the destination folder
});

gulp.task(SCSS_VERISK_TASK, function () {
    return gulp.src('sass/verisk-theme/vs.scss') // Get source files with gulp.src
        .pipe(sass()) // Sends it through a gulp plugin
        .pipe(rename('vs-verisk.css'))
        .pipe(gulp.dest(`css/${VERSION}`)) // Outputs the file in the destination folder
});

gulp.task('scripts', function () {
    gulp.src(component_list)
        .pipe(concat('vs-scripts.js'))
        //   .pipe(uglify())
        .pipe(gulp.dest(`js/${VERSION}`))
});

gulp.task('watch', function () {
    gulp.watch('sass/*', gulp.parallel(SCSS_FORAM_TASK, SCSS_VERISK_TASK));
    gulp.watch('component/*.js', gulp.parallel('scripts'));
});
gulp.task('default', gulp.parallel(SCSS_FORAM_TASK, SCSS_VERISK_TASK, 'scripts'));

