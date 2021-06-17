import { dest, series, parallel, src, watch as gulp_watch } from "gulp";
import run from "gulp-run-command";
import gtcm from "gulp-typed-css-modules";
import browserSync from "browser-sync";

const browserSyncServer = browserSync.create();

const SRC = "src";
const DIST = "dist";
const DEV_DIST = "dev/dist";

export async function build() {
  await run("npx webpack --mode production")();
}

export async function build_local_dev() {
  await run("npx webpack --mode development --config webpack.local_dev.js")();
}

export function css_types_src() {
  return src(`${SRC}/*.scss`)
    .pipe(gtcm())
    .pipe(dest(`${SRC}/`));
}

const build_target = parallel(
  build,
  build_local_dev,
  css_types_src,
);

export function watch() {
  gulp_watch(
    [`${SRC}/*.scss`, `${SRC}/*.js`],
    { ignoreInitial: false },
    build_target,
  )
}

export function webserver() {
  browserSyncServer.init({
    server: {
      baseDir: `${DEV_DIST}/`,
    },
  });

  gulp_watch(`${DEV_DIST}/**/*`).on("change", browserSyncServer.reload);
}

export const dev = parallel(webserver, watch);

export default build_target;
