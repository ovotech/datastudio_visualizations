import { dest, series, parallel, src, watch as gulp_watch } from "gulp";
import run from "gulp-run-command";
import gtcm from "gulp-typed-css-modules";
import rename from "gulp-rename";
import browserSync from "browser-sync";

const browserSyncServer = browserSync.create();

const SRC = "src";
const DIST = "dist";
const DEV_DIST = "dist_dev";
const LOCAL_DEV_DIST = "local_dev/dist";
const CUBISM_DIST = "../cubism-react/dist";

const GS_BUCKET_PROD = "orion-sre-datastudio-viz";
const GS_BUCKET_DEV = "orion-sre-datastudio-viz-dev";

export async function flow() {
  await run("npx flow")();
}

export async function tests() {
  await run("npx jest")();
}

export function docs_index() {
  return src("README.md")
    .pipe(rename((path, file) => {
      path.basename = "index";
    }))
    .pipe(dest("docs/"));
}

export const docs = parallel(docs_index);

export async function build() {
  await run("npx webpack --mode production")();
}

export async function build_dev() {
  await run("npx webpack --mode development --config webpack.dev.js")();
}

export async function build_local_dev() {
  await run("npx webpack --mode development --config webpack.local_dev.js")();
}

export function css_types_src() {
  return src(`${SRC}/*.scss`)
    .pipe(gtcm())
    .pipe(dest(`${SRC}/`));
}

const build_target = series(
  parallel(flow),
  parallel(
    build,
    build_local_dev,
    build_dev,
    css_types_src,
    docs,
  ),
);

export function watch() {
  gulp_watch(
    [`${SRC}/*.scss`, `${SRC}/*.js`, `${CUBISM_DIST}/**/*`],
    { ignoreInitial: false },
    build_target,
  )
}

export function webserver() {
  browserSyncServer.init({
    server: {
      baseDir: `${LOCAL_DEV_DIST}/`,
    },
  });

  gulp_watch(`${LOCAL_DEV_DIST}/**/*`).on("change", browserSyncServer.reload);
}

export const dev = parallel(webserver, watch);

export async function upload_prod_impl() {
  await run(`gsutil cp -a public-read ${DIST}/* gs://${GS_BUCKET_PROD}`)
}

export async function upload_dev_impl() {
  await run(`gsutil cp -a public-read ${DEV_DIST}/* gs://${GS_BUCKET_DEV}`)
}

export const upload_prod = series(
  css_types_src,
  build,
  upload_prod_impl,
);

export const upload_dev = series(
  css_types_src,
  build_dev,
  upload_dev_impl,
);

export default build_target;
