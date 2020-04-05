const gulp = require('gulp');
const sass = require('gulp-sass');
const pug = require('gulp-pug');
var uglify = require('gulp-uglify');
const autoprefixer = require('gulp-autoprefixer');
const browsersync = require('browser-sync');

exports.autoprefixer = () => (
    gulp.src('src/scss/**/*.scss')
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(gulp.dest('dist/assets/css/'))
)

// gulp.task('comprimir', function () {
//     return pipeline(
//           gulp.src('src/js/*.js'),
//           uglify(),
//           gulp.dest('dist/assets')
//     );
//   });

gulp.task('sass', () => {
    return gulp.src('src/scss/**/*.scss')
                .pipe(sass({
                    outputStyle: 'compressed'
                }).on('error', sass.logError))
                .pipe(autoprefixer({
                    cascade: false
                }))
                .pipe(gulp.dest('dist/assets/css/'))
                .pipe(browsersync.stream())
})

gulp.task('pug', () => {
    return gulp.src('src/pug/**/*.pug')
                .pipe(pug({
                    pretty: true
                }))
                .pipe(gulp.dest('dist/'))
})

gulp.task('default', () => {
    // gulp.watch('src/js/*.js', gulp.series('comprimir'));
    gulp.watch('src/**/*.pug', gulp.series('pug'));
    gulp.watch('src/scss/**/*.scss', gulp.series('sass'));
    gulp.watch('dist/**/*.html').on('change', browsersync.reload)
    browsersync.init({
        baseDir: './dist'
    });
})