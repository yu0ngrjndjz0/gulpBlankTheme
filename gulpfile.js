const gulp = require("gulp");
const plumber = require("gulp-plumber");
const concat = require("gulp-concat");
const sass = require("gulp-sass");
const sourceMaps = require("gulp-sourcemaps");
const uglify = require("gulp-uglify");
const autoprefixer = require('gulp-autoprefixer');
const imageMinify = require("gulp-imagemin");
const browserSync = require("browser-sync");
const fileInclude = require("gulp-file-include");
const prettyHtml = require("gulp-pretty-html");
const clean = require("gulp-clean");
const cleanCSS = require("gulp-clean-css");

const SOURCE_PATH = "./app";
const DIST_PATH = "./dist";

const BROWSER_SYNC = {
  port: 3000,
  server: DIST_PATH,
  open: true
};

const HTML_PRETTY = {
  indent_size: 4,
  indent_char: " ",
  unformatted: ["code", "pre", "em", "strong", "span", "i", "b", "br"]
};

const scriptTask = () => {
  return gulp
    .src([
      SOURCE_PATH + "/scripts/**/*.js"
      // SOURCE_PATH + "/scripts/app.js"
    ])
    .pipe(
      plumber({
        errorHandler: function(err) {
          console.error(err);
          this.emit("end");
        }
      })
    )
    .pipe(sourceMaps.init())
    // .pipe(concat("app.js"))
    .pipe(uglify())
    .pipe(sourceMaps.write("map"))
    .pipe(gulp.dest(DIST_PATH + "/scripts"))
    .pipe(browserSync.reload({ stream: true }));
};

const sassTask = () => {
  return gulp
    // .src(SOURCE_PATH + "/scss/**/*.scss")
    .src(SOURCE_PATH + "/scss/main.scss")
    .pipe(sourceMaps.init())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(concat("main.css"))
    .pipe(sourceMaps.write("maps"))
    .pipe(browserSync.reload({ stream: true }))
    .pipe(gulp.dest(DIST_PATH + "/css"));
};

const imagesTask = () => {
  return gulp
    .src(SOURCE_PATH + "/images/**/*.*")
    .pipe(plumber())
    .pipe(
      imageMinify({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true
      })
    )
    .pipe(gulp.dest(DIST_PATH + "/images"))
    .pipe(browserSync.reload({ stream: true }));
};

const htmlTask = () => {
  return gulp
    .src([SOURCE_PATH + "/**/*.html", "!" + SOURCE_PATH + "/**/_*"])
    .pipe(
      fileInclude({
        prefix: "@@",
        basepath: "@file"
      })
    )
    .pipe(prettyHtml(HTML_PRETTY))
    .pipe(gulp.dest(DIST_PATH))
    .pipe(browserSync.reload({ stream: true }));
};

const commonTask = () => {
  htmlTask();
  sassTask();
  scriptTask();
  imagesTask();
  browserTask();
};

const watch = () => {
  commonTask();
  gulp.watch(SOURCE_PATH + "/scss/**/*.scss", sassTask);
  gulp.watch(SOURCE_PATH + "/**/*.html", htmlTask);
  gulp.watch(SOURCE_PATH + "/scripts/**/*.js", scriptTask);
  gulp.watch(SOURCE_PATH + "/images/**/*.*", imagesTask);
};

const browserTask = () => {
  browserSync.init(BROWSER_SYNC);
};
const cleanTask = () => {
  return gulp.src(DIST_PATH + "/*", { read: false }).pipe(clean());
};
exports.watch = watch;
exports.build = gulp.series(
  cleanTask,
  imagesTask,
  sassTask,
  scriptTask,
  htmlTask
);
