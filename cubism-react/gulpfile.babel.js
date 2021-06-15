import { dest, series, parallel, src } from "gulp";
import babel from "gulp-babel";
import eol from "gulp-eol";
import sass from "gulp-sass";
import sourcemaps from "gulp-sourcemaps";
import run from "gulp-run-command";
import clean_files from "gulp-clean";

const SRC = "src";
const DIST = "dist";
const DEMOS_DIST = "demos/dist";

export function clean() {
  return src([`${DIST}/**/*`, `${DEMOS_DIST}/**/*`], {read: false})
    .pipe(clean_files())
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
  run(`npx flow-copy-source -i "*.stories.js" ${SRC} ${DIST}`)();
  // run(`npx gen-flow-files ${SRC} --out-dir ${DIST}/`)();
  run(`find ${DIST} -type f -exec sed -i 's/"\\(.*\\)\\.scss"/"\\1.css"/g' {} +`)();
  // run(`rm ${DIST}/*.stories.js.flow`, { ignoreErrors: true })();
}

export async function css_d_ts() {
  run(`npx tcm ${DIST}`)();
  run(`npx tcm -p "*.scss" ${SRC}`)();
}

export default series(clean, parallel(scss, flowfiles, js), css_d_ts, demos);
