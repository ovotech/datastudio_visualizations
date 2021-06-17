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
import browserSync from "browser-sync";

const browserSyncServer = browserSync.create();

const SRC = "src";
const DIST = "dist";
const DEMOS_DIST = "demos/dist";

export function clean() {
  return del([
    `${DIST}/**/*`,
    `${DEMOS_DIST}/**/*`,
  ]);
}

export async function flow() {
  await run("npx flow")();
}

export async function tests() {
  await run("npx jest")();
}

export async function storybook() {
  await run("npx build-storybook -o docs/gen/storybook")();
}

export function docs_index() {
  return src("README.md")
    .pipe(rename((path, file) => {
      path.basename = "index";
    }))
    .pipe(dest("docs/"));
}

export const docs = parallel(storybook, docs_index);

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
  await run("npx webpack --mode development")();
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

const watch_series = series(
  flow,
  parallel(scss, flowfiles, js),
  parallel(css_types_dist, css_types_src),
  demos,
);

export function watch() {
  gulp_watch(
    [`${SRC}/*.scss`, `${SRC}/*.js`],
    { ignoreInitial: false },
    watch_series,
  )
}

export function webserver() {
  browserSyncServer.init({
    server: {
      baseDir: `${DEMOS_DIST}/`,
    },
  });

  gulp_watch(`${DEMOS_DIST}/**/*`).on("change", browserSyncServer.reload);
}

export const dev = parallel(webserver, watch);

export default series(
  flow,
  clean,
  parallel(scss, flowfiles, js),
  parallel(css_types_dist, css_types_src),
  parallel(docs, demos)
);
