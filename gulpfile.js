var gulp = require("gulp");
var jshint = require("gulp-jshint");
var imagemin = require("gulp-imagemin");
var browserify = require("browserify");
var uglify = require("gulp-uglify");
var minifyHTML = require("gulp-minify-html");
var concat = require("gulp-concat");
var rename = require("gulp-rename");
var source = require("vinyl-source-stream");
var buffer = require("vinyl-buffer");

// JavaScript linting task
gulp.task("jshint", function() {
  return gulp.src("site/js/*.js")
    .pipe(jshint())
    .pipe(jshint.reporter("default"));
});

// Watch task
gulp.task("watch", function() {
	gulp.watch("site/js/*.js", ["jshint"]);
  gulp.watch("site/css/*.css", ["sass"]);
});

// Minify index
gulp.task("html", function() {
  gulp.src("site/index.html")
    .pipe(minifyHTML())
    .pipe(gulp.dest("build/"));
});

// JavaScript build task, removes whitespace and concatenates all files
gulp.task("scripts", function() {
  return browserify("./site/js/main.js")
    .bundle()
    .pipe(source("main.js"))
    .pipe(buffer())
    //.pipe(uglify())
    .pipe(gulp.dest("build/js"));
});

// Styles build task, concatenates all the files
gulp.task("styles", function() {
  gulp.src("site/css/*.css")
    .pipe(concat("styles.css"))
    .pipe(gulp.dest("build/css"));
});

// Fonts build task, concatenates all the files
gulp.task("fonts", function() {
  gulp.src("site/fonts/*")
    .pipe(gulp.dest("build/fonts"));
});

// Image optimization task
gulp.task("images", function() {
  gulp.src("site/img/*")
    .pipe(imagemin())
    .pipe(gulp.dest("build/img"));
});

// Default task
gulp.task("default", ["jshint", "watch"]);

// Build task
gulp.task("build", ["jshint", "html", "scripts", "styles", "fonts", "images"]);