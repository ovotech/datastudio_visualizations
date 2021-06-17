import DevData from "./dev-data.json";

export function subscribeToData(dataCallback, options) {
  setTimeout(() => {
    dataCallback(DevData);
  }, 100);
}

export function getWidth() {
  return 800;
}

export function getHeight() {
  return 600;
}

export const objectTransform = "objectTransform";
