////////////////
// list dependences
const { src, dest, watch, series } = require("gulp");
const prefix = require("gulp-autoprefixer");
const minify = require("gulp-clean-css");
// const terser = require("gulp-terser");
const imagemin = require("gulp-imagemin");
const imagewebp = require("gulp-webp");
const sass = require("gulp-sass")(require("sass"));

// Create functions

// scss
function compilescss() {
  return src("src/sass/*.scss")
    .pipe(sass())
    .pipe(prefix("last 10 versions"))
    .pipe(minify())
    .pipe(dest("dist/css"));
}

//js
// function jsmin() {
//   return src("src/js/*.js").pipe(terser()).pipe("dest/js");
// }

//images
function optimizimg() {
  return src("src/img/*.{jpg,png}")
    .pipe(
      imagemin([
        imagemin.mozjpeg({ quality: 80, progressive: true }),
        imagemin.optipng({ optiminazationLevel: 2 }),
      ])
    )
    .pipe(dest("dist/img"));
}

// webp img
function webpImg() {
  return src("dest/img/*.{jpg,png}").pipe(imagewebp()).pipe(dest("dist/img"));
}

////////////
//create watchtask
function watchTask() {
  watch("src/scss/*.scss", compilescss);
  // watch("src/js/*.js", jsmin);
  watch("src/img/*.{jpg,png}", optimizimg);
  watch("dist/img/*.{jpg,png}", webpImg);
}

// defalt gulp
exports.default = series(compilescss, optimizimg, webpImg, watchTask);
