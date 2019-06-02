// Need to require packages
const gulp = require('gulp'),
    watch = require('gulp-watch'),
    imagemin = require('gulp-imagemin'),
    babel = require('gulp-babel'),
    uglify = require('gulp-uglify'),
    cleanCSS = require('gulp-clean-css'),
    htmlmin = require('gulp-htmlmin'),
    browserSync = require("browser-sync").create();

// Copies all html files into ‘dist’ folder
gulp.task('copyHTML', () => {
    return gulp.src('src/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist'));
});

// Copies all css files into ‘dist’ folder
gulp.task('copyCSS', () => {
    return gulp.src('src/css/*.css')
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist/css'));
});


// Optimize images
gulp.task('imageMin', () => {
    return gulp.src('src/img/*.*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'))
});

// Optimize scripts
gulp.task('scripts', () => {
    return gulp.src('src/js/*.js')
        .pipe(babel({
            presets: [
                ['@babel/env', {
                    modules: false
                }]
            ]
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

// Optimize scripts
gulp.task('sw', () => {
    return gulp.src('src/*.js')
        .pipe(babel({
            presets: [
                ['@babel/env', {
                    modules: false
                }]
            ]
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/'));
});


// Copies all html files into ‘dist’ folder
gulp.task('copyJSON', () => {
    return gulp.src('src/data/*.json')
        .pipe(gulp.dest('dist/data'));
});

gulp.task('copyFiles', gulp.parallel('imageMin', 'copyHTML', 'copyCSS', 'copyJSON'));

gulp.task('default', gulp.parallel('copyFiles', 'scripts', 'sw'));

gulp.task("serve", () => {
    browserSync.init({
        port: 8000,
        server: {
            baseDir: "./src"
        }
    });
    gulp.watch(["./src/*.html", "src/css/*.css", "src/js/*.js"])
        .on("change", browserSync.reload);
});

gulp.task("serve-dist", () => {
    browserSync.init({
        port: 8000,
        server: {
            baseDir: "./dist"
        }
    });
});

