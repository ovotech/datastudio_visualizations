import { dest, series, parallel, src, watch as gulp_watch } from "gulp";
import babel from "gulp-babel";
import eol from "gulp-eol";
import sass from "gulp-sass";
import sourcemaps from "gulp-sourcemaps";
import run from "gulp-run-command";
import del from "del";
import gtcm from "gulp-typed-css-modules";
import rename from "gulp-rename";
import replace from "gulp-replace";

const SRC = "src";
const DIST = "dist";
const DEMOS_DIST = "demos/dist";

export function clean() {
  return del([
    `${DIST}/**/*`,
    `${DEMOS_DIST}/**/*`,
  ]);
}

export function scss() {
  return src(`${SRC}/*.scss`)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write("."))
    .pipe(dest(`${DIST}/`));
}

export function js() {
  return src([`${SRC}/*.js`, "!**/*.stories.js"])
    .pipe(babel())
    .pipe(eol())
    .pipe(dest(`${DIST}/`));
}

export async function demos() {
  run("npx webpack --mode development")();
}

export async function flowfiles() {
  return src([`${SRC}/*.js`, "!**/*.stories.js"])
    .pipe(rename((path, file) => {
      path.extname = ".js.flow";
    }))
    .pipe(replace(/"(.*)\.scss"/, '"$1.css"'))
    .pipe(dest(`${DIST}/`));
}

export function css_types_dist() {
  return src(`${DIST}/*.css`)
    .pipe(gtcm())
    .pipe(dest(`${DIST}/`));
}

export function css_types_src() {
  return src(`${SRC}/*.scss`)
    .pipe(gtcm())
    .pipe(dest(`${SRC}/`));
}

export function watch() {
  gulp_watch(
    [`${SRC}/*.scss`, `${SRC}/*.js`],
    { ignoreInitial: false },
    series(
      parallel(scss, flowfiles, js),
      parallel(css_types_dist, css_types_src),
      demos,
    ),
  )
}

export default series(
  clean,
  parallel(scss, flowfiles, js),
  parallel(css_types_dist, css_types_src),
  demos,
);
