# Cubism, React!
Welcome to Cubism, this time React-ified.

## What is a Cubism?
Cubism graphs are high-density charts that are super useful for dashboarding whilst keeping a higher resolution.
See [Square's Cubism.js documentation](https://square.github.io/cubism/) for more information on the charts and how they're better than line charts for high-density dashboarding.

## How do I use this?
There's an example inside the demos folder, we will be adding to the demos as we progress with the project.

## Development flow
- `npm install --dev`
- `npx gulp dev` to automatically rebuild artefacts with a live http server for the demos
- Make changes
- Test changes
- Create a PR

## Useful Gulp targets
- `default` (`npx gulp`):
  Clean the `dist` directory and re-build all artefacts.
- `watch` (`npx gulp watch`):
  Watch sources for changes and re-build all artefacts (will not clean the `dist` directory).
- `dev` (`npx gulp dev`):
  Run a local dev server serving the `demos/dist` directory & re-build artefacts on changes (a la `watch`).

## I found a bug!
Great! Create an issue, and if you can: submit a PR!
