// импорт пакетов
const gulp = require("gulp");
const browserSync = require("browser-sync");
const sass = require("gulp-sass");
const cleanCSS = require("gulp-clean-css");
const autoprefixer = require("gulp-autoprefixer");
const rename = require("gulp-rename");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const htmlmin = require("gulp-htmlmin");
const wait = require("gulp-wait");
const critical = require("critical").stream;

gulp.task("server", function () {
   browserSync({
      server: {
         baseDir: "dist",
      },
   });

   gulp.watch("src/*.html").on("change", browserSync.reload);
   gulp.watch("js/*.js").on("change", browserSync.reload);
});

gulp.task("styles", function () {
   return gulp
      .src("src/sass/**/*.+(scss|sass)")
      .pipe(wait(700))
      .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
      .pipe(rename({ suffix: ".min", prefix: "" }))
      .pipe(autoprefixer())
      .pipe(cleanCSS({ compatibility: "ie8" }))
      .pipe(gulp.dest("dist/css"))
      .pipe(browserSync.stream());
});

gulp.task("watch", function () {
   gulp.watch("src/sass/**/*.+(scss|sass|css)", gulp.parallel("styles"));
   gulp.watch("src/*.html").on("change", gulp.parallel("html"));
   gulp.watch("src/js/**/*", gulp.parallel("scripts"));
});

gulp.task("html", function () {
   return gulp
      .src("src/*.html")
      .pipe(htmlmin({ collapseWhitespace: true }))
      .pipe(gulp.dest("dist/"));
});

gulp.task("scripts", function () {
   return gulp.src("src/js/**/*").pipe(gulp.dest("dist/js"));
});

gulp.task("fonts", function () {
   return gulp.src("src/fonts/**/*").pipe(gulp.dest("dist/fonts"));
});

gulp.task("icons", function () {
   return gulp.src("src/icons/**/*").pipe(gulp.dest("dist/icons"));
});

gulp.task("mailer", function () {
   return gulp.src("src/mailer/**/*").pipe(gulp.dest("dist/mailer"));
});

gulp.task("webp", () =>
   gulp
      .src("src/img/**/*.+(jpg|png)")
      .pipe(
         webp({
            quality: 80,
         })
      )
      .pipe(gulp.dest("dist/img"))
);

gulp.task("images", function () {
   return gulp
      .src("src/img/**/*")
      .pipe(imagemin([imagemin.mozjpeg({ quality: 80, progressive: true })]))
      .pipe(gulp.dest("dist/img"));
});

// Generate & Inline Critical-path CSS
gulp.task("critical", () => {
   return gulp
      .src("src/*.html")
      .pipe(
         critical({
            //base: "dist/",
            inline: true,
            css: "dist/css/style.min.css",
            target: {
               html: "dist/index.html",
               css: "dist/css/uncritical.css",
            },
            dimensions: [
               {
                  width: 320,
                  height: 568,
               },
               {
                  width: 375,
                  height: 812,
               },
               {
                  width: 1280,
                  height: 720,
               },
               {
                  width: 1920,
                  height: 1080,
               },
            ],
         })
      )
      .pipe(gulp.dest("dist"));
});

gulp.task(
   "default",
   gulp.parallel("watch", "server", "styles", "scripts", "fonts", "icons", "mailer", "html", "images", "webp")
);
